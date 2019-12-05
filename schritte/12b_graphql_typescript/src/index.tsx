import "react-app-polyfill/ie11";

// React
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App";
import LoginProvider from "./components/LoginProvider";
import createApolloClient from "./createApolloClient";

const apolloClient = createApolloClient();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
