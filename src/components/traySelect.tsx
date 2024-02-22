import { trayResult } from "../routes/profile";
import styles from "../styles/components/traySelect.module.scss";
import TrayCell from "./trayCell";

interface TraySelectProps {
  trays: trayResult[];
}

const traySelect: React.FC<TraySelectProps> = ({ trays }) => {
  console.log(trays);
  return (
    <div className={styles.main}>
      {trays.map((tray) => (
        <TrayCell
          key={tray.id}
          id={tray.id}
          name={tray.name}
          rows={tray.rows}
          cols={tray.cols}
        />
      ))}
    </div>
  );
};

export default traySelect;
