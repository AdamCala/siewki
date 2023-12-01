import styles from "../styles/siewki/index.module.scss";

const siewki = () => {
  return (
    <div>
      <div className={`${styles.main_l} w-screen h-screen`}></div>
      <div className={`${styles.main_r}`}></div>
    </div>
  );
};

export default siewki;
