import "react-app-polyfill/ie11";

// React
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import VoteListPage from "./components/VoteListPage";

ReactDOM.render(
  <App>
    <VoteListPage />
  </App>,
  document.getElementById("root")
);
