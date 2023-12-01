import Logo from "../components/icons/logo";
import { Link } from "react-router-dom";
import styles from "../styles/index.module.scss";

const Root = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <div
        className={`${styles.left} w-2/3 h-screen flex flex-col justify-center `}
      >
        <p
          className={`${styles.text} tracking-widest text-9xl font-black italic`}
        >
          SIEWKI
        </p>
        <div className="w-full h-3/6"></div>
      </div>
      <div className={`${styles.right} w-1/3 h-screen`}></div>
      <div className="absolute w-full h-full flex flex-row">
        <div className="w-1/3"></div>
        <div className="w-2/3 flex justify-center items-center">
          <Link to={"/siewki"}>
            <Logo></Logo>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Root;
