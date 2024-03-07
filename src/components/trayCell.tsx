import { FC } from "react";
import styles from "../styles/components/trayCell.module.scss";
import Add from "./icons/add";

interface trayCellProps {
  isOpen: boolean;
  onOpen: () => void;
}

const trayCell: FC<trayCellProps> = (props) => {
  const { onOpen } = props;
  return (
    <div className={styles.main} onClick={onOpen}>
      <Add className={styles.icon} />
    </div>
  );
};

export default trayCell;
