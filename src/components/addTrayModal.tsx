import { FC } from "react";
import styles from "../styles/components/addTrayModal.module.scss";
import Button from "./utils/button";

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
  //   + remove
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
            <Button onClick={onClose} text="CLOSE" />
          </div>
        </div>
      </div>
    </>
  );
};

export default addTrayModal;
