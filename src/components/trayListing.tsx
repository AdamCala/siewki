import { trayResult } from "../routes/profile";
import styles from "../styles/components/trayListing.module.scss";
import { useNavigate } from "react-router-dom";
import SeedlingTray from "./icons/seedlingTray";

const trayListing = (props: trayResult) => {
  const { id, cols, rows, name } = props;
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/tray/${id}`);
  }
  return (
    <div className={styles.main}>
      <div key={id} className={styles.tray} onClick={handleOnClick}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.size}>
            {rows}x{cols}
          </p>
        </div>

        <SeedlingTray className={styles.icon} />
      </div>
    </div>
  );
};

export default trayListing;
