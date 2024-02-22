import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/components/addTrayModal.module.scss";
import Button from "./utils/button";
import InputText from "./utils/inputText";
import AddCols from "./icons/addCols";
import AddRows from "./icons/addRows";
import SeedlingTray from "./icons/seedlingTray";
import { TrayForm, trayFormSchema } from "../models/Tray";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../hooks/storeHook";

interface addTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => Promise<void>;
}

/**
 * @component
 * @param {Object} props - Component props containing:
 *   @param {boolean} isOpen - Indicates whether the modal is open or closed.
 *   @param {Function} onClose - Callback function to close the modal.
 * @returns {JSX.Element} - JSX element representing the SettingsPage component.
 */

const addTrayModal: FC<addTrayModalProps> = (props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fetchData = props.fetchData;
  const { isOpen, onClose } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFormSubmit = async (data: TrayForm): Promise<void> => {
    // Clear any existing error messages
    setErrorMessage(null);
    // Set loading state to indicate form submission is in progress
    setLoading(true);

    const { name, cols, rows, owner } = data;
    try {
      // Attempt to create a new tray with Firebase
      const traysCollectionRef = collection(db, "trays");
      await setDoc(doc(traysCollectionRef), { name, cols, rows, owner });
      setLoading(false);
      formRef.current!.reset();
      onClose();
    } catch (error: any) {
      // Handle errors by updating error message state
      setLoading(false);
      const errorCode = error.code;
      setErrorMessage(errorCode);
    }
  };
  const handleModalClose = () => {
    formRef.current!.reset();
    onClose();
  };
  /**
   * Handles the submission of the authentication form using React Hook Form.
   * - Registers form fields and validation rules using useForm and yupResolver.
   *
   * @param {AuthForm} data - Form data containing name, cols, and rows.
   * @returns {Object} - React Hook Form properties for form management.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrayForm>({
    resolver: yupResolver(trayFormSchema()),
  });

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm`}
        style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
      >
        <div className={styles.main}>
          <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
            {errorMessage && (
              <p className={`${styles.errorMsgDiv} `}>{errorMessage}</p>
            )}
            <div className={styles.modal}>
              <input
                className={styles.hidden}
                value={user?.id}
                {...register("owner")}
              />
              <div className={styles.modify}>
                <InputText
                  className={`${styles.inputText} ${styles.row1}`}
                  type="text"
                  placeholder="tray name"
                  id="name"
                  {...register("name")}
                />
                <div className={styles.warningDiv}>
                  {errors.name ? (
                    <span className={`${styles.errorMsg} `}>
                      {errors.name.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <AddCols className={`${styles.icon} ${styles.row2}`} />
                <InputText
                  className={`${styles.inputText} ${styles.row2}`}
                  type="number"
                  placeholder="columns"
                  id="cols"
                  {...register("cols")}
                />
                <div className={styles.warningDiv}>
                  {errors.cols ? (
                    <span className={`${styles.errorMsg} `}>
                      {errors.cols.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <AddRows className={`${styles.icon} ${styles.row3}`} />
                <InputText
                  className={`${styles.inputText} ${styles.row3}`}
                  type="number"
                  placeholder="rows"
                  id="rows"
                  {...register("rows")}
                />
                <div className={styles.warningDiv}>
                  {errors.rows ? (
                    <span className={`${styles.errorMsg} `}>
                      {errors.rows.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <SeedlingTray className={styles.trayIcon} />
              <div className={styles.finalize}>
                <Button
                  disabled={loading}
                  className={styles.button}
                  text="ADD TRAY"
                  type="submit"
                />
                <Button
                  className={styles.button}
                  onClick={handleModalClose}
                  text="CANCEL"
                  type="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addTrayModal;
