import DesktopBackground from "../components/assets/desktopBackground";
import styles from "../styles/siewki/index.module.scss";

const profile = () => {
  return (
    <>
      <DesktopBackground
        className={`${styles.background_svg} absolute bottom-0`}
      />
      <div className={`${styles.main_l} w-screen h-screen`}></div>
    </>
  );
};

export default profile;
