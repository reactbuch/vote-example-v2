import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import HelloMessage from "./HelloMessage";
ReactDOM.render(
  <HelloMessage initialMessage="Hello" />,
  document.getElementById("root")
);
