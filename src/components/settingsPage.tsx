import { FC } from "react";
import styles from "../styles/components/settingsPage.module.scss";
import { User } from "../models/User";

interface settingsProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  handlePasswordReset: () => Promise<void>;
  resetPasswordEmail: string;
  resetPasswordSuccess: null | string;
  resetPasswordError: null | string;
  setResetPasswordEmail: React.Dispatch<React.SetStateAction<string>>;
}

const settingsPage: FC<settingsProps> = (props) => {
  const {
    isOpen,
    onClose,
    user,
    handlePasswordReset,
    resetPasswordEmail,
    resetPasswordError,
    resetPasswordSuccess,
    setResetPasswordEmail,
  } = props;
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
    >
      <div className={`${styles.main}`}>
        <div className={`${styles.outer_circle}`}>
          <div
            className={`${styles.circle} rounded-full flex justify-center items-center`}
          >
            {user?.photoUrl ? (
              <img
                className="w-4/5 rounded-full"
                src={user.photoUrl}
                alt="avatar"
              />
            ) : (
              <div className="w-4/5 h-4/5 rounded-full">
                {user?.email[0].toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p>{user?.email}</p>
          </div>
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
        <div
          onClick={handlePasswordReset}
          className={`${styles.buttonDiv} cursor-pointer`}
        >
          <p className={`my-5`}>Change Password</p>
        </div>
        {resetPasswordSuccess && (
          <p className={`${styles.success} `}>{resetPasswordSuccess}</p>
        )}
        {resetPasswordError && (
          <p className={`${styles.error} `}>{resetPasswordError}</p>
        )}
        <div onClick={onClose} className={`${styles.buttonDiv} cursor-pointer`}>
          <p className={`my-5`}>Close</p>
        </div>
      </div>
    </div>
  );
};

export default settingsPage;
