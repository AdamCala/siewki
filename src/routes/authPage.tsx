import styles from "../styles/auth/index.module.scss";
import Mail from "../components/icons/email";
import Google from "../components/icons/google";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthForm, authFormSchema } from "../models/Form";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { login } from "../features/authSlice";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import ResetPasswordModal from "../components/resetPasswordModal";
import InputText from "../components/utils/inputText";

/**
 * Component representing the authentication page.
 * Handles user login, sign-up, and password reset functionalities.
 * Integrates with Firebase authentication and Firestore for user data storage.
 * Uses Yup for form validation.
 * @returns {JSX.Element} The JSX element representing the authentication page.
 */
const AuthPage = () => {
  const [authType, setAuthType] = useState<"login" | "sign-up">("login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [resetPassword, setResetPassword] = useState(false);

  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redirects to the profile page after successful authentication
  useEffect(() => {
    if (Boolean(user)) {
      navigate("/profile");
    }
  }, [user, navigate]);

  /**
   * Handles the password reset process.
   * Sends a reset email and updates state based on success or error.
   * @returns {Promise<void>} - A Promise that resolves when the password reset is complete.
   * */
  const handlePasswordReset = async () => {
    if (!resetPasswordEmail.length) return;
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      setResetPasswordSuccess(
        "Password reset link sent. Please check your inbox"
      );
      setResetPasswordError(null);
    } catch (error: any) {
      setResetPasswordError(error.code);
      setResetPasswordSuccess(null);
    }
  };

  /**
   * Signs in the user with Google authentication.
   * @returns {Promise<void>} - A Promise that resolves when the sign up is complete.
   * */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
      }
    } catch (error) {
      console.log("Error signing in: ", error);
    }
  };

  /**
   * Handles form submission for login or sign-up.
   * @param {AuthForm} data - Form data containing email and password.
   * @returns {Promise<void>} - A Promise that resolves when the form submission is complete.
   */
  const handleFormSubmit = async (data: AuthForm): Promise<void> => {
    // Clear any existing error messages
    setErrorMessage(null);

    // Set loading state to indicate form submission is in progress
    setLoading(true);

    const { email, password } = data;

    if (authType === "sign-up") {
      try {
        // Attempt to create a new user with Firebase authentication
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Create a user document in Firestore with the user's email
        await setDoc(doc(db, "users", user.uid), { email });

        // Dispatch a login action to update Redux state upon successful sign-up
        setLoading(false);
        if (user && user.email) {
          dispatch(
            login({
              email: user.email,
              id: user.uid,
              photoUrl: user.photoURL || null,
            })
          );
        }
      } catch (error: any) {
        // Handle errors by updating error message state
        setLoading(false);
        const errorCode = error.code;
        setErrorMessage(errorCode);
      }
    }
    if (authType === "login") {
      console.log(user);
      try {
        // Attempt to sign in with Firebase authentication
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Dispatch a login action to update Redux state upon successful login
        setLoading(false);
        if (user && user.email) {
          dispatch(
            login({
              email: user.email,
              id: user.uid,
              photoUrl: user.photoURL || null,
            })
          );
        }
      } catch (error: any) {
        // Handle errors by updating error message state
        setLoading(false);
        const errorCode = error.code;
        setErrorMessage(errorCode);
      }
    }
  };

  /**
   * Handles the submission of the authentication form using React Hook Form.
   * - Registers form fields and validation rules using useForm and yupResolver.
   *
   * @param {AuthForm} data - Form data containing email, password, and confirmPassword.
   * @returns {Object} - React Hook Form properties for form management.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(authFormSchema(authType)),
  });

  /**
   * Toggles between login and sign-up forms.
   */
  const handleAuthType = () => {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "sign-up" : "login"
    );
    console.log(authType);
  };

  return (
    <>
      {/* Desktop background SVG */}
      {/* <DesktopBackground
        className={`${styles.background_svg} absolute bottom-0 z-10 pointer-events-none`}
      /> */}

      {/* ResetPassword component */}
      <ResetPasswordModal
        resetPasswordEmail={resetPasswordEmail}
        resetPasswordSuccess={resetPasswordSuccess}
        resetPasswordError={resetPasswordError}
        setResetPasswordEmail={setResetPasswordEmail}
        isOpen={resetPassword}
        onClose={() => setResetPassword(false)}
        handlePasswordReset={handlePasswordReset}
      />

      {/* Main content of the authentication page */}
      <div className={styles.main}>
        {/* Authentication form */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {errorMessage && (
            <p className={`${styles.errorMsgDiv} `}>{errorMessage}</p>
          )}

          {/* Login box containing form elements */}
          <div
            className={`${styles.loginBox} flex flex-col items-center justify-evenly`}
          >
            {/* Google sign-in button */}
            <div
              onClick={signInWithGoogle}
              className={`${styles.buttonDiv} hover:cursor-pointer`}
            >
              <Google className={`${styles.icon} `} />
              <p className={`${styles.text} `}>Login with Google</p>
            </div>

            {/* Or separator */}
            <div className={`${styles.line} `}>
              <div />
              <p>Or</p>
              <div />
            </div>

            {/* Email input */}
            <InputText
              type="text"
              id="email"
              placeholder="example@email.com"
              {...register("email")}
            />
            {errors.email ? (
              <span className={`${styles.errorMsg} `}>
                {errors.email.message}
              </span>
            ) : (
              <></>
            )}

            {/* Password input */}
            <InputText
              type="password"
              id="passwd"
              placeholder="* * * * * * * *"
              {...register("password")}
            />
            {errors.password ? (
              <span className={`${styles.errorMsg} `}>
                {errors.password.message}
              </span>
            ) : (
              <></>
            )}

            {/* Confirm Password input for sign-up */}
            {authType === "sign-up" && (
              <InputText
                type="password"
                id="confpasswd"
                placeholder="confirm password"
                {...register("confirmPassword")}
              />
            )}
            {errors.confirmPassword ? (
              <span className={`${styles.errorMsg} `}>
                {errors.confirmPassword.message}
              </span>
            ) : (
              <></>
            )}

            {/* Submit button */}
            <button
              disabled={loading}
              type="submit"
              className={`${styles.buttonDiv} `}
            >
              <Mail className={`${styles.icon} text-black/40`} />
              <p className={`${styles.text} `}>
                {authType === "login" ? "Login" : "Sign up"} with email
              </p>
            </button>

            {/* Prompt to switch between login and sign-up forms */}
            {authType === "login" ? (
              <div className={`${styles.promptDiv} `}>
                <p className="hover:cursor-pointer" onClick={handleAuthType}>
                  Don't have an account yet? Sign Up
                </p>
              </div>
            ) : (
              <div className={`${styles.promptDiv} `}>
                <p className="hover:cursor-pointer" onClick={handleAuthType}>
                  Already have an account? Sign In
                </p>
              </div>
            )}

            {/* Password reset link */}
            <div className={`${styles.line} `}>
              <div />
              <button
                type="button"
                onClick={() => setResetPassword(true)}
                className="text-center"
              >
                Forgot Password
              </button>
              <div />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
