import React from "react";

export default function ChoiceBar({ title, percent, count, onClickHandler }) {
  return (
    <div className="ChoiceBar" onClick={onClickHandler}>
      <div className="Progress" style={{ width: percent + "%" }}>
        <div className="ChoiceBarTitle">{title}</div>
      </div>
      <div className="ChoiceBarBadge">{count}</div>
    </div>
  );
}
