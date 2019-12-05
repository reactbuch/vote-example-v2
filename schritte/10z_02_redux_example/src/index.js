import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducer";

import HelloMessage from "./HelloMessage";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <HelloMessage initialMessage="Hello" />
  </Provider>,
  document.getElementById("root")
);
