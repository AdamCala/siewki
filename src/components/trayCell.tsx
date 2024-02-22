import { trayResult } from "../routes/profile";
import styles from "../styles/components/trayCell.module.scss";

const trayCell = (props: trayResult) => {
  const { id, cols, rows, name } = props;
  return (
    <div key={id} className={styles.main}>
      <p>{name}</p>
      <p>
        {rows}x{cols}
      </p>
    </div>
  );
};

export default trayCell;
