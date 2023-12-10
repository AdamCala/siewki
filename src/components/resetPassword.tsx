import { FC, useState } from "react";
import styles from "../styles/components/resetPassword.module.scss";

interface resetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const resetPassword: FC<resetPasswordProps> = (props) => {
  const { isOpen, onClose } = props;

  const [email, setEmail] = useState("");

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center bg-black bg-opacity-50`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
    >
      <div className={`${styles.main}`}>
        <div className={`${styles.line} `}>
          <div />
          <h1 className="text-center">Password Reset</h1>
          <div />
        </div>
        <div className={`${styles.inputDiv}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="your@email.com"
            id="email"
          />
        </div>
        <div className={`${styles.buttonDiv}`}>
          <button className={`${styles.text}`}>Reset Password</button>
        </div>
        <div className={`${styles.line} `}>
          <div />
          <button onClick={onClose}>Close</button>
          <div />
        </div>
      </div>
    </div>
  );
};

export default resetPassword;
