import Logo from "../components/icons/logo";
import { useNavigate } from "react-router-dom";
import styles from "../styles/index.module.scss";
import { useAppSelector } from "../hooks/storeHook";

/**
 * Component representing the root view of the application.
 * Uses Framer Motion for animations and React Router for navigation.
 * @returns {JSX.Element} The JSX element representing the root view.
 */
const Root = () => {
  const navigate = useNavigate();

  // Selects user information from the Redux store
  const { user } = useAppSelector((state) => state.auth);

  /**
   * Event handler for logo click.
   */
  const handleLogoClick = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left} />
        <div className={styles.right} />
        <div className={styles.text}>
          <p>SIEWKI</p>
        </div>
        <div className={styles.logo}>
          <Logo onClick={handleLogoClick}></Logo>
        </div>
      </div>
    </>
  );
};

export default Root;
