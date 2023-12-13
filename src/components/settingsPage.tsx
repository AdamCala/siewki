import { FC } from "react";
import styles from "../styles/components/settingsPage.module.scss";

interface settingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const settingsPage: FC<settingsProps> = (props) => {
  const { isOpen, onClose } = props;
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center bg-black bg-opacity-50`}
      style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
    >
      <div className={`${styles.main}`}>
        <div className={`${styles.line} `}>
          <div />
          <button className={`my-5`} onClick={onClose}>
            Close
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};

export default settingsPage;
