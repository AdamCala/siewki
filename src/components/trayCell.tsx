import { FC } from "react";
import styles from "../styles/components/trayCell.module.scss";
import Add from "./icons/add";

interface trayCellProps {
  row: number;
  col: number;
  onOpen: () => void;
}

const trayCell: FC<trayCellProps> = (props) => {
  const { row, col, onOpen } = props;
  //   + cancel
  //   + add
  //   + isGerminated?
  //   + plant
  //   + datePlanted
  //   + dateGerminated / isGerminated
  //   + category
  //   + seedTray
  //   + description
  //   + reset
  //   + seedSource

  return (
    <div className={styles.main} onClick={onOpen}>
      <Add className={styles.icon} />
    </div>
  );
};

export default trayCell;
