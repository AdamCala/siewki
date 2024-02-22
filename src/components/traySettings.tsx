import { FC, SetStateAction } from "react";
import styles from "../styles/components/traySettings.module.scss";
import Add from "./icons/add";
import Edit from "./icons/edit";
import Remove from "./icons/remove";

/**
 * Interface representing props for settings modal
 * @interface traySettingsProps
 */

interface traySettingsProps {
  setOpenAddModal: (value: SetStateAction<boolean>) => void;
}

/**
 *
 * @param {object} props
 *  @param {(value: SetStateAction<boolean>) => void} openSettingsModal - action for changing openAddModal state
 * @returns {JSX.Element} - JSX element representing the TraySettings component.
 */

const traySettings: FC<traySettingsProps> = (props) => {
  const { setOpenAddModal } = props;

  return (
    <div className={styles.main}>
      <div onClick={() => setOpenAddModal(true)} className={styles.add_button}>
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
