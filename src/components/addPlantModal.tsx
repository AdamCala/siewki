import { FC } from "react";
import styles from "../styles/components/addPlantModal.module.scss";
import Button from "./utils/button";

interface addPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const addPlantModal: FC<addPlantModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-200%"})` }}
    >
      <div className={styles.main}>
        <Button
          className={styles.button}
          onClick={onClose}
          text="CANCEL"
          type="button"
        />
      </div>
    </div>
  );
};

export default addPlantModal;
