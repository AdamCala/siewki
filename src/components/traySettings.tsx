import styles from "../styles/components/traySettings.module.scss";
import Add from "./icons/add";
import Edit from "./icons/edit";
import Remove from "./icons/remove";

const traySettings = () => {
  // + add tray
  // + remove tray
  // + edit tray
  return (
    <div className={styles.main}>
      <div className={styles.add_button}>
        <Add className={styles.icon} />
        <p>ADD TRAY</p>
      </div>
      <div className={styles.remove_button}>
        <Remove className={styles.icon} />
        <p>REMOVE TRAY</p>
      </div>
      <div className={styles.edit_button}>
        <Edit className={styles.icon} />
        <p>EDIT TRAY</p>
      </div>
    </div>
  );
};

export default traySettings;
