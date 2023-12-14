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
    <div
      className={`${styles.main} w-screen h-screen flex justify-evenly items-center flex-col`}
    >
      {/* Empty div for spacing */}
      <div></div>

      {/* Container with logo and 404 message */}
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-col gap-[4vh] cursor-pointer"
      >
        <Logo />
        <h1>404 Page Not Found</h1>
      </div>

      {/* Empty div for spacing */}
      <div></div>
      <div></div>
    </div>
  );
};

export default NotFound;
