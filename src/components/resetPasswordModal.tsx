import { FC, SetStateAction } from "react";
import styles from "../styles/components/resetPasswordModal.module.scss";
import Logo from "./icons/logo";
import InputText from "./utils/inputText";
import Button from "./utils/button";
import ErrorPopup from "./utils/errorPopup";

/**
 * Interface representing props for reset password modal
 * @interface resetPasswordProps
 */
interface resetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  handlePasswordReset: () => Promise<void>;
  resetPasswordEmail: string;
  resetPasswordSuccess: null | string;
  resetPasswordError: null | string;
  setResetPasswordEmail: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * ResetPassword Component:
 * - Functional component responsible for rendering the password reset modal.
 * - Receives props to manage the modal state, handle password reset, and display feedback.
 *
 * @component
 * @param {Object} props - Component props containing:
 *   @param {boolean} isOpen - Indicates whether the modal is open or closed.
 *   @param {Function} onClose - Callback function to close the modal.
 *   @param {Function => Promise<void>} handlePasswordReset - Async function to handle the password reset process.
 *   @param {string} resetPasswordEmail - Current value of the email input.
 *   @param {string | null} resetPasswordSuccess - Success message for password reset.
 *   @param {string | null} resetPasswordError - Error message for password reset.
 *   @param {React.Dispatch<React.SetStateAction<string>>} setResetPasswordEmail - State updater for resetPasswordEmail.
 * @returns {JSX.Element} - JSX element representing the ResetPassword component.
 */

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
  console.log(resetPasswordSuccess);
  console.log(resetPasswordError);
  return (
    // Outer container with fixed positioning and backdrop blur
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-200%"})` }}
    >
      {resetPasswordSuccess && (
        <ErrorPopup
          error={false} // There is no error in this case
          messages={{ success: { message: resetPasswordSuccess } }}
        />
      )}
      {/* Display error message if any */}
      {resetPasswordError && (
        <ErrorPopup
          error={true} // There is an error in this case
          messages={{ error: { message: resetPasswordError } }}
        />
      )}
      {/* Main content container */}
      <div className={`${styles.flexWrapper}`}>
        <div className={`${styles.main}`}>
          {/* Password reset section */}
          <div className={`${styles.forgot} `}>
            <Logo className={`${styles.logo} `} />
            <h1 className="text-center">Forgot your password?</h1>
            <p>
              Enter your email address and we will send you instructions to
              reset your password
            </p>
          </div>

          <InputText
            type="email"
            value={resetPasswordEmail}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
              setResetPasswordEmail(e.target.value);
            }}
            placeholder="your@email.com"
            id="email"
          />

          {/* Button to trigger password reset */}
          <Button
            onClick={handlePasswordReset}
            className={`${styles.text}`}
            text="Reset Password"
          />

          {/* Line and close button section */}
          <div className={`${styles.line} `}>
            <div />
            <button className="my-5" onClick={onClose}>
              <p>Close</p>
            </button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default resetPassword;
