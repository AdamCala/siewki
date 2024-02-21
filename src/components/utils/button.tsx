import styles from "../../styles/components/utils/button.module.scss";

const Button = ({ className, ...props }: any) => {
  return (
    <div className={`${styles.buttonDiv} ${className}`}>
      <button {...props}></button>
    </div>
  );
};

export default Button;
