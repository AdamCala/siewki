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
import ResetPassword from "../components/resetPassword";

const authPage = () => {
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

  useEffect(() => {
    if (Boolean(user)) {
      navigate("/siewki");
    }
  }, [user, navigate]);

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

  const handleFormSubmit = async (data: AuthForm) => {
    setErrorMessage(null);
    setLoading(true);
    const { email, password } = data;
    if (authType == "sign-up") {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDoc(doc(db, "users", user.uid), { email });
        setLoading(false);

        if (user && user.email)
          dispatch(
            login({
              email: user.email,
              id: user.uid,
              photoUrl: user.photoURL || null,
            })
          );
      } catch (error: any) {
        setLoading(false);
        const errorCode = error.code;
        setErrorMessage(errorCode);
      }
    } else {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(authFormSchema),
  });

  const handleAuthType = () => {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "sign-up" : "login"
    );
  };

  return (
    <>
      <ResetPassword
        resetPasswordEmail={resetPasswordEmail}
        resetPasswordSuccess={resetPasswordSuccess}
        resetPasswordError={resetPasswordError}
        setResetPasswordEmail={setResetPasswordEmail}
        isOpen={resetPassword}
        onClose={() => setResetPassword(false)}
        handlePasswordReset={handlePasswordReset}
      />
      <div
        className={`${styles.main} w-screen h-screen flex justify-evenly items-center flex-col`}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {errorMessage && (
            <p className={`${styles.errorMsgDiv} `}>{errorMessage}</p>
          )}
          <div
            className={`${styles.loginBox} flex flex-col items-center justify-evenly`}
          >
            <div
              onClick={signInWithGoogle}
              className={`${styles.buttonDiv} hover:cursor-pointer`}
            >
              <Google className={`${styles.icon} `} />
              <p className={`${styles.text} `}>Login with Google</p>
            </div>
            <div className={`${styles.line} `}>
              <div />
              <p>Or</p>
              <div />
            </div>

            <div className={`${styles.inputDiv} `}>
              <input
                type="text"
                id="email"
                placeholder="example@email.com"
                {...register("email")}
              />
            </div>
            {errors.email ? (
              <span className={`${styles.errorMsg} `}>
                {errors.email.message}
              </span>
            ) : (
              <></>
            )}
            <div className={`${styles.inputDiv} `}>
              <input
                type="password"
                id="passwd"
                placeholder="* * * * * * * *"
                {...register("password")}
              />
            </div>
            {errors.password ? (
              <span className={`${styles.errorMsg} `}>
                {errors.password.message}
              </span>
            ) : (
              <></>
            )}
            <div className={`${styles.inputDiv} `}>
              <input
                type="password"
                id="confpasswd"
                placeholder="confirm password"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword ? (
              <span className={`${styles.errorMsg} `}>
                {errors.confirmPassword.message}
              </span>
            ) : (
              <></>
            )}
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
            {authType === "login" ? (
              <div className={`${styles.promptDiv} `}>
                <p className="hover:cursor-pointer" onClick={handleAuthType}>
                  Don't have account yet? Sign Up
                </p>
              </div>
            ) : (
              <div className={`${styles.promptDiv} `}>
                <p className="hover:cursor-pointer" onClick={handleAuthType}>
                  Already have an account? Sign In
                </p>
              </div>
            )}

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
        <div></div>
      </div>
    </>
  );
};

export default authPage;
