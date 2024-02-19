import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../components/icons/logout";
import Settings from "../components/icons/settings";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import styles from "../styles/profile/index.module.scss";

import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { logout } from "../features/authSlice";
import SettingsPage from "../components/settingsPage";

/**
 * Component representing the user profile page.
 * Displays user information, allows logout, and provides options for password reset and settings.
 * @returns {JSX.Element} The JSX element representing the user profile page.
 */
const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [openSettings, setOpenSettings] = useState(false);

  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * Handles the logout process.
   * Signs out the user and dispatches the logout action to update the Redux store.
   */
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  /**
   * Handles the password reset process.
   * Sends a password reset email to the user's email address.
   */
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

  // Redirects to the authentication page if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [navigate, user]);

  return (
    <>
      {/* SettingsPage component for handling user settings */}
      <SettingsPage
        setResetPasswordEmail={setResetPasswordEmail}
        resetPasswordSuccess={resetPasswordSuccess}
        resetPasswordError={resetPasswordError}
        resetPasswordEmail={resetPasswordEmail}
        handlePasswordReset={handlePasswordReset}
        user={user}
        isOpen={openSettings}
        onClose={() => setOpenSettings(false)}
      />
      <div className={`${styles.main} w-screen h-screen`}>
        <div className={styles.circle_container}>
          {/* User avatar or initial letter */}
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

          {/* Logout button */}
          <div
            onClick={handleLogout}
            className={`${styles.circle_md} rounded-full cursor-pointer`}
          >
            <Logout className={`${styles.icon}`} />
          </div>

          {/* Settings button */}
          <div
            onClick={() => setOpenSettings(true)}
            className={`${styles.circle_sm} rounded-full cursor-pointer`}
          >
            <Settings className={`${styles.icon}`} />
          </div>
        </div>

        {/* Container for tray listings */}
        <div className={`${styles.tray_container}`}></div>

        {/* Div for blurring the background */}
        <div className={`${styles.bluring_div}`} />
      </div>
    </>
  );
};

export default Profile;
