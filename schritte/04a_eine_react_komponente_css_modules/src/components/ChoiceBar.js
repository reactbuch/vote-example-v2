import React from "react";
import styles from "./ChoiceBar.module.css";

export default function ChoiceBar({ title, count, percent }) {
  return (
    <div className={styles.ChoiceBar}>
      <div className={styles.Progress} style={{ width: percent + "%" }}>
        <div className={styles.ChoiceBarTitle}>{title}</div>
      </div>
      <div className={styles.ChoiceBarBadge}>{count}</div>
    </div>
  );
}
