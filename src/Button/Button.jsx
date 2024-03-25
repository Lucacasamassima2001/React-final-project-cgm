/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export default function Button({ children, onClick, cartStyle, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button}`}
      id={cartStyle ? `${styles.cartBtn}` : ""}
      {...props}
    >
      {children}
    </button>
  );
}
