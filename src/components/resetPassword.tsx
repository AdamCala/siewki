import { FC } from "react";
import styles from "../styles/components/resetPassword.module.scss";
import Logo from "./icons/logo";

interface resetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  handlePasswordReset: () => Promise<void>;
  resetPasswordEmail: string;
  resetPasswordSuccess: null | string;
  resetPasswordError: null | string;
  setResetPasswordEmail: React.Dispatch<React.SetStateAction<string>>;
}

const resetPassword: FC<resetPasswordProps> = (props) => {
  const {
    isOpen,
    onClose,
    handlePasswordReset,
    resetPasswordEmail,
    resetPasswordSuccess,
    resetPasswordError,
    setResetPasswordEmail,
  } = props;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
    >
      <div className={`${styles.main}`}>
        <div className={`${styles.forgot} `}>
          <Logo className={`${styles.logo} `} />
          <h1 className="text-center">Forgot your password?</h1>
          <p>
            Enter your email adress and we will send you instructions to reset
            your password
          </p>
        </div>
        <div className={`${styles.inputDiv}`}>
          <input
            type="email"
            value={resetPasswordEmail}
            onChange={(e) => {
              setResetPasswordEmail(e.target.value);
            }}
            placeholder="your@email.com"
            id="email"
          />
        </div>
        <div className={`${styles.buttonDiv}`}>
          <button onClick={handlePasswordReset} className={`${styles.text}`}>
            Reset Password
          </button>
        </div>
        {resetPasswordSuccess && (
          <p className={`${styles.success} `}>{resetPasswordSuccess}</p>
        )}
        {resetPasswordError && (
          <p className={`${styles.error} `}>{resetPasswordError}</p>
        )}
        <div className={`${styles.line} `}>
          <div />
          <button className="my-5" onClick={onClose}>
            Close
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};

export default resetPassword;
