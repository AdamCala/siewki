import styles from "../styles/components/trayCell.module.scss";
import Add from "./icons/add";

const trayCell = () => {
  return (
    <div>
      <Add className={styles.icon} />
    </div>
  );
};

export default trayCell;
