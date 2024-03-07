import { useParams } from "react-router-dom";
import styles from "../styles/tray/index.module.scss";
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAppSelector } from "../hooks/storeHook";
import { useMemo, useState } from "react";
import Add from "../components/icons/add";
import TrayCell from "../components/trayCell";
const trayPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [name, setName] = useState("");

  const { id } = useParams();
  const fetchData = useMemo(
    () => async () => {
      try {
        if (user != null) {
          const q = query(
            collection(db, "trays"),
            where("owner", "==", user.id)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // Check if the document ID matches the desired ID
            if (doc.id == id) {
              // This document matches the criteria
              console.log("Found the document:", doc.id, doc.data());
              const data = doc.data() as DocumentData;
              setRows(data.rows);
              setCols(data.cols);
              setName(data.name);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    [user]
  );
  fetchData();
  const gridTemplateColumns = `repeat(${cols + 1}, 1fr)`;
  const gridTemplateRows = `repeat(${rows + 1}, 1fr)`;

  return (
    <div className={styles.main}>
      <div className={styles.name}>{name}</div>
      <div
        className={styles.tray}
        style={{ gridTemplateColumns, gridTemplateRows }}
      >
        <div className={styles.magicIndexHideout}></div>
        {Array.from({ length: cols + 1 }).map((_, colIndex) => (
          <div key={`row-header-${colIndex}`} className={styles.colIndex}>
            {colIndex === 0 ? (
              <div className={styles.hidden}></div>
            ) : (
              <div>{colIndex}</div>
            )}
          </div>
        ))}
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: cols + 1 }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${styles.cell} ${
                colIndex === 0 ? styles.rowIndex : ""
              }`}
            >
              {colIndex === 0 ? <div>{rowIndex + 1}</div> : <TrayCell />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default trayPage;
