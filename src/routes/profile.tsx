import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../components/icons/logout";
import Settings from "../components/icons/settings";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import styles from "../styles/profile/index.module.scss";

import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { logout } from "../features/authSlice";
import SettingsModal from "../components/settingsModal";
import TraySelect from "../components/traySelect";
import TraySettings from "../components/traySettings";
import AddTrayModal from "../components/addTrayModal";
import { collection, getDocs, query, where } from "@firebase/firestore";

export interface trayResult {
  id: string;
  name: string;
  cols: number;
  rows: number;
  owner: string;
}
/**
 * Component representing the user profile page.
 * Displays user information, allows logout, and provides options for password reset and settings.
 * @returns {JSX.Element} The JSX element representing the user profile page.
 */
const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [openSettings, setOpenSettings] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [trays, setTrays] = useState<trayResult[]>([]);

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
      if (error.code == "auth/invalid-email") {
        setResetPasswordError("Please provide a valid email");
      }
      setResetPasswordSuccess(null);
    }
  };
  const fetchData = async () => {
    try {
      if (user) {
        const q = query(collection(db, "trays"), where("owner", "==", user.id));
        const querySnapshot = await getDocs(q);
        const fetchedTrays: trayResult[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const tray: trayResult = {
            id: doc.id,
            name: data.name,
            owner: data.owner,
            rows: data.rows,
            cols: data.cols,
          };
          fetchedTrays.push(tray);
        });
        setTrays(fetchedTrays);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Redirects to the authentication page if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [navigate, user]);

  return (
    <>
      {/* SettingsPage component for handling user settings */}
      <SettingsModal
        setResetPasswordEmail={setResetPasswordEmail}
        resetPasswordSuccess={resetPasswordSuccess}
        resetPasswordError={resetPasswordError}
        resetPasswordEmail={resetPasswordEmail}
        handlePasswordReset={handlePasswordReset}
        user={user}
        isOpen={openSettings}
        onClose={() => setOpenSettings(false)}
      />
      <AddTrayModal
        fetchData={fetchData}
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
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
        {/* Container for tray settings */}
        <div className={`${styles.tray_settings}`}>
          <TraySettings setOpenAddModal={setOpenAddModal}></TraySettings>
        </div>
        {/* Container for tray listings */}
        <div className={`${styles.tray_container}`}>
          <TraySelect trays={trays} />
        </div>
      </div>
    </>
  );
};

export default Profile;
