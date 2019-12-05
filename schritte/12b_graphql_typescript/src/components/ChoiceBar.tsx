import React from "react";

type ChoiceBarProps = {
  title: string;
  count: number;
  percent: number;
  onClickHandler: () => void;
};

export default function ChoiceBar({
  title,
  percent,
  count,
  onClickHandler
}: ChoiceBarProps) {
  return (
    <div className="ChoiceBar" onClick={onClickHandler}>
      <div className="Progress" style={{ width: percent + "%" }}>
        <div className="ChoiceBarTitle">{title}</div>
      </div>
      <div className="ChoiceBarBadge">{count}</div>
    </div>
  );
}
