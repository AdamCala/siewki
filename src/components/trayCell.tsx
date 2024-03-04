import { trayResult } from "../routes/profile";
import styles from "../styles/components/trayCell.module.scss";
import { useNavigate } from "react-router-dom";

const trayCell = (props: trayResult) => {
  const { id, cols, rows, name } = props;
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/tray/${id}`);
  }
  return (
    <div key={id} className={styles.main} onClick={handleOnClick}>
      <p>{name}</p>
      <p>
        {rows}x{cols}
      </p>
    </div>
  );
};

export default trayCell;
