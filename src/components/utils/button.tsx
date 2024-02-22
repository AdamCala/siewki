import styles from "../../styles/components/utils/button.module.scss";

const Button = ({ className, text, icon, type, ...props }: any) => {
  return (
    <button
      {...props}
      className={`${styles.buttonDiv} ${className}`}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
