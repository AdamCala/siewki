import { useForm } from "react-hook-form";
import Mail from "../components/icons/email";
import Google from "../components/icons/google";
import styles from "../styles/auth/index.module.scss";
import { AuthForm, authFormSchema } from "../models/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAppDispatch } from "../hooks/storeHook";
import { login } from "../features/authSlice";

const authPage = () => {
  const [authType, setAuthType] = useState<"login" | "sign-up">("login");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (data: AuthForm) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);

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
    } catch (error) {
      setLoading(false);
      console.log(error);
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
      <div
        className={`${styles.main} w-screen h-screen flex justify-evenly items-center flex-col`}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div
            className={`${styles.loginBox} flex flex-col items-center justify-evenly`}
          >
            <div className={`${styles.buttonDiv} `}>
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
              <button className="text-center">Forgot Password</button>
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
