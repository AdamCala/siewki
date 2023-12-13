import Logout from "../components/icons/logout";
import Settings from "../components/icons/settings";
import { useAppSelector } from "../hooks/storeHook";
import styles from "../styles/profile/index.module.scss";

const profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
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
        <div className={`${styles.circle_md} rounded-full`}>
          <Logout className={`${styles.icon}`} />
        </div>
        <div className={`${styles.circle_sm} rounded-full`}>
          <Settings className={`${styles.icon}`} />
        </div>
      </div>
    </>
  );
};

export default profile;
