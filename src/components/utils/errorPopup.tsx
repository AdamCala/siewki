import { FC } from "react";
import styles from "../../styles/components/utils/errorPopup.module.scss";
import Error from "../icons/error";
import Success from "../icons/success";

interface ErrorMessage {
  message: string | undefined;
}

interface ErrorPopupProps {
  error: boolean;
  messages: Record<string, ErrorMessage>; // Record type for mapping keys to error messages
}

const ErrorPopup: FC<ErrorPopupProps> = (props) => {
  const { messages, error } = props;
  return (
    <div className={styles.main}>
      {Object.keys(messages).map((key) => (
        <div
          key={key}
          className={`${styles.popup} ${error ? styles.error : styles.success}`}
        >
          {error ? (
            <Error className={styles.icon} />
          ) : (
            <Success className={styles.icon} />
          )}
          <p className={styles.text}>{messages[key].message}</p>
        </div>
      ))}
    </div>
  );
};

export default ErrorPopup;
