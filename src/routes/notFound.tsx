import { useNavigate } from "react-router-dom";
import Logo from "../components/icons/logo";
import styles from "../styles/notFound/index.module.scss";

const notFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.main} w-screen h-screen flex justify-evenly items-center flex-col`}
    >
      <div></div>
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-col gap-[4vh] cursor-pointer"
      >
        <Logo />
        <h1>404 page not found</h1>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default notFound;
