import { useNavigate } from "react-router-dom";
import Logo from "../components/icons/logo";
import styles from "../styles/notFound/index.module.scss";
/**
 * Component representing the 404 Not Found page.
 * Displays a message, logo, and provides a link to navigate back to the home page.
 * @returns {JSX.Element} The JSX element representing the 404 Not Found page.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.main}`}>
      <div className={styles.left} />
      <div className={styles.right} />
      <div
        onClick={() => {
          navigate("/");
        }}
        className={`${styles.logoDiv}`}
      >
        <Logo className={`${styles.logo}`} />
        <h1>404 Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFound;
