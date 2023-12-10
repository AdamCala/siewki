import { useForm } from "react-hook-form";
import Mail from "../components/icons/email";
import Google from "../components/icons/google";
import styles from "../styles/auth/index.module.scss";
import { AuthForm, authFormSchema } from "../models/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const auth = () => {
  const [authType, setAuthType] = useState<"login" | "sign-up">("login");

  const handleFormSubmit = (data: AuthForm) => {
    console.log(data);
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
                id=""
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
                id=""
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
                id=""
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
            <button type="submit" className={`${styles.buttonDiv} `}>
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

export default auth;
