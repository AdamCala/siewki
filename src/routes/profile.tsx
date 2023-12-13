import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../components/icons/logout";
import Settings from "../components/icons/settings";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import styles from "../styles/profile/index.module.scss";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { logout } from "../features/authSlice";
import SettingsPage from "../components/settingsPage";

const profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [openSettings, setOpenSettings] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  useEffect(() => {
    // if (Boolean(!user)) {
    //     navigate('/auth');
    // }
  }, [navigate, user]);

  return (
    <>
      <SettingsPage
        isOpen={openSettings}
        onClose={() => setOpenSettings(false)}
      />
      <div className={`${styles.main} w-screen h-screen`}>
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
        <div
          onClick={handleLogout}
          className={`${styles.circle_md} rounded-full cursor-pointer`}
        >
          <Logout className={`${styles.icon}`} />
        </div>
        <div
          onClick={() => setOpenSettings(true)}
          className={`${styles.circle_sm} rounded-full cursor-pointer`}
        >
          <Settings className={`${styles.icon}`} />
        </div>
      </div>
    </>
  );
};

export default profile;
