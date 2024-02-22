import React from "react";
import styles from "../../styles/components/utils/inputText.module.scss";

const InputText = React.forwardRef(
  ({ type, className, ...props }: any, ref) => {
    //   console.log({ ...props });
    return (
      <div className={`${styles.inputDiv}  ${className}`}>
        <input {...props} type={type} ref={ref} />
      </div>
    );
  }
);

export default InputText;
