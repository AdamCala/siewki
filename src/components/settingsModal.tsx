import { FC, SetStateAction } from "react";
import styles from "../styles/components/settingsModal.module.scss";
import { User } from "../models/User";
import InputText from "./utils/inputText";

/**
 * Interface representing props for settings modal
 * @interface settingsProps
 */

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

/**
 * SettingsPage Component:
 * - A modal component for displaying user settings.
 * - Displays the user's profile picture or a placeholder.
 * - Shows the user's email address.
 * - Provides an input for changing the password.
 * - Includes a button to trigger the password change process.
 * - Shows success or error messages based on the password change operation.
 * - Includes a button to close the modal.
 *
 * @component
 * @param {Object} props - Component props containing:
 *   @param {boolean} isOpen - Indicates whether the modal is open or closed.
 *   @param {Function} onClose - Callback function to close the modal.
 *   @param {User | null} user - User information, including email and profile picture URL.
 *   @param {Function => Promise<void>} handlePasswordReset - Callback function to initiate the password reset.
 *   @param {string} resetPasswordEmail - The email address for password reset.
 *   @param {string | null} resetPasswordSuccess - Success message after a successful password reset.
 *   @param {string | null} resetPasswordError - Error message if the password reset encounters an issue.
 *   @param {React.Dispatch<React.SetStateAction<string>>} setResetPasswordEmail - State setter for the reset password email.
 * @returns {JSX.Element} - JSX element representing the SettingsPage component.
 */
const settingsModal: FC<settingsProps> = (props) => {
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
    // Outer container with fixed positioning and backdrop blur
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
    >
      {/* Main content container */}
      <div className={`${styles.main}`}>
        {/* User information display */}
        <div className={`${styles.outer_circle}`}>
          <div
            className={`${styles.circle} rounded-full flex justify-center items-center`}
          >
            {/* Display user photo or initial letter */}
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
            {/* Display user email */}
            <p>{user?.email}</p>
          </div>
        </div>

        {/* Input field for entering email */}
        <InputText
          className={styles.inputDivWidth}
          type="email"
          value={resetPasswordEmail}
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setResetPasswordEmail(e.target.value);
          }}
          placeholder="your@email.com"
          id="email"
        />

        {/* Button to trigger password reset */}
        <div
          onClick={handlePasswordReset}
          className={`${styles.buttonDiv} cursor-pointer`}
        >
          <p className={`my-5`}>Change Password</p>
        </div>

        {/* Display success message if any */}
        {resetPasswordSuccess && (
          <p className={`${styles.success} `}>{resetPasswordSuccess}</p>
        )}

        {/* Display error message if any */}
        {resetPasswordError && (
          <p className={`${styles.error} `}>{resetPasswordError}</p>
        )}

        {/* Button to close the modal */}
        <div onClick={onClose} className={`${styles.buttonDiv} cursor-pointer`}>
          <p className={`my-5`}>Close</p>
        </div>
      </div>
    </div>
  );
};

export default settingsModal;
