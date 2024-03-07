import { FC } from "react";
import styles from "../styles/components/addPlantModal.module.scss";
import Button from "./utils/button";
import InputText from "./utils/inputText";

interface addPlantModalProps {
  isOpen: boolean;
  trayName: string;
  onClose: () => void;
}

const addPlantModal: FC<addPlantModalProps> = (props) => {
  const { isOpen, trayName, onClose } = props;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-200%"})` }}
    >
      <div className={styles.main}>
        <p className={styles.name}>Seedling Tray: {trayName}</p>
        <InputText
          className={styles.buttonPlant}
          type="text"
          placeholder="Plant Name"
        />
        <InputText className={styles.buttonDate} type="date" />
        <Button
          className={styles.buttonGerm}
          text="Already Germinated?"
          type="button"
        />
        <textarea className={styles.desc} placeholder="Description" />
        <InputText className={styles.cat} type="text" placeholder="Category" />
        <InputText
          className={styles.src}
          type="text"
          placeholder="Seed Source"
        />
        <Button className={styles.reset} text="Reset" type="button" />
        <div className={styles.finalize}>
          <Button className={styles.buttonAdd} text="ADD" type="button" />
          <Button
            className={styles.buttonDel}
            onClick={onClose}
            text="CANCEL"
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default addPlantModal;
