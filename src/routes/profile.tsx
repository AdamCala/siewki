import DesktopBackground from "../components/assets/desktopBackground";
import Logout from "../components/icons/logout";
import Settings from "../components/icons/settings";
import styles from "../styles/profile/index.module.scss";

const profile = () => {
  return (
    <>
      <DesktopBackground
        className={`${styles.background_svg} absolute bottom-0`}
      />
      <div className={`${styles.main} w-screen h-screen`}>
        <div className={`${styles.circle} rounded-full`}>
          <div className={`${styles.circle_md} rounded-full`}>
            <Logout className={`${styles.icon}`} />
          </div>
          <div className={`${styles.circle_sm} rounded-full`}>
            <Settings className={`${styles.icon}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
