import React from "react";
import styled from "styled-components";

const ChoiceBarBadge = styled.div`
  position: absolute;
  right: 16px;
  height: 24px;
  font-size: 16px;
  width: 50px;
  top: 50%;
  margin-top: -16px;
  background-color: white;
  padding: 4px 8px 4px 8px;
  text-align: center;
  border-radius: 10px;
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: inline-block;
  white-space: nowrap;
  background-color: #ffb273;
  width: ${props => props.value}%;
`;

const ChoiceBarTitle = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  font-size: 16px;
  margin-top: -11px;
`;

function ChoiceBar({ title, count, percent, className }) {
  return (
    <div className={className}>
      <Progress value={percent}>
        <ChoiceBarTitle>{title}</ChoiceBarTitle>
      </Progress>
      <ChoiceBarBadge>{count}</ChoiceBarBadge>
    </div>
  );
}

const StyledChoiceBar = styled(ChoiceBar)`
  border: 3px solid #ffb273;
  margin-bottom: 24px;
  background-color: #5ccccc;
  height: 40px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -khtml-border-radius: 10px;
  position: relative;

  :hover {
    border: 3px solid #ff9640;
    border-radius: 10px;
    cursor: pointer;
  }

  :hover ${Progress} {
    background-color: #ff9640;
    cursor: pointer;
  }

  :hover ${ChoiceBarBadge} {
    background-color: #ff9640;
    border: 1px solid #5ccccc;
    color: #a60000;
  }
`;

export default StyledChoiceBar;
