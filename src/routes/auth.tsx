import Mail from "../components/icons/email";
import Google from "../components/icons/google";
import styles from "../styles/auth/index.module.scss";

const auth = () => {
  return (
    <>
      <div
        className={`${styles.main} w-screen h-screen flex justify-evenly items-center flex-col`}
      >
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
            <input type="text" name="" id="" placeholder="example@email.com" />
          </div>
          <div className={`${styles.inputDiv} `}>
            <input
              type="password"
              name=""
              id=""
              placeholder="* * * * * * * *"
            />
          </div>
          <div className={`${styles.inputDiv} `}>
            <input
              type="password"
              name=""
              id=""
              placeholder="confirm password"
            />
          </div>
          <div className={`${styles.buttonDiv} `}>
            <Mail className={`${styles.icon} text-black/40`} />
            <p className={`${styles.text} `}>Login with email</p>
          </div>
          <div className={`${styles.promptDiv} `}>
            <p>Don't have account yet? Sign Up</p>
          </div>
          <div className={`${styles.line} `}>
            <div />
            <p className="text-center">Forgot Password</p>
            <div />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default auth;
