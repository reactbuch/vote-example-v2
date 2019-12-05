// React
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import ChoiceBar from "./components/ChoiceBar";

ReactDOM.render(
  <ChoiceBar title="JavaScript" percent={37} />,
  document.getElementById("root")
);
