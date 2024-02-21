import { FC } from "react";
import styles from "../styles/components/addTrayModal.module.scss";
import Button from "./utils/button";
import InputText from "./utils/inputText";
import AddCols from "./icons/addCols";
import AddRows from "./icons/addRows";
import SeedlingTray from "./icons/seedlingTray";

interface addTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @component
 * @param {Object} props - Component props containing:
 *   @param {boolean} isOpen - Indicates whether the modal is open or closed.
 *   @param {Function} onClose - Callback function to close the modal.
 * @returns {JSX.Element} - JSX element representing the SettingsPage component.
 */

const addTrayModal: FC<addTrayModalProps> = (props) => {
  const { isOpen, onClose } = props;
  //   + add
  //   + cancel
  //   + name
  //   + cols
  //   + rows
  //   + desc
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
        style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
      >
        <div className={styles.main}>
          <div className={styles.modal}>
            <div className={styles.modify}>
              <InputText
                className={`${styles.inputText} ${styles.row1}`}
                type="text"
                placeholder="tray name"
              />
              <AddCols className={`${styles.icon} ${styles.row2}`} />
              <InputText
                className={`${styles.inputText} ${styles.row2}`}
                type="number"
                placeholder="columns"
              />
              <AddRows className={`${styles.icon} ${styles.row3}`} />
              <InputText
                className={`${styles.inputText} ${styles.row3}`}
                type="number"
                placeholder="rows"
              />
            </div>
            <SeedlingTray className={styles.trayIcon} />
            <div className={styles.finalize}>
              <Button className={styles.button} text="ADD TRAY" />
              <Button
                className={styles.button}
                onClick={onClose}
                text="CANCEL"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default addTrayModal;
