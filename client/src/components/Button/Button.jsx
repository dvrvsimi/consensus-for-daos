import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, title, icon, color, backgroundColor }) => {
  return (
    <div
      className={styles.buttonContainer}
      onClick={onClick}
      style={{ color: color, backgroundColor: backgroundColor }}
    >
      <div className={styles.titleButton}>{title}</div>
      <div className={styles.iconButton}>{icon}</div>
    </div>
  );
};

export default Button;
