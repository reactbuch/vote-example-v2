import React from "react";

import { useSelector, shallowEqual } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LoadingIndicator from "./components/LoadingIndicator";
import Layout from "./components/Layout";
import ErrorMessage from "./components/ErrorMessage";
import routes from "./routes";

export default function App() {
  const { loading, description, error } = useSelector(
    state => state.api,
    shallowEqual
  );

  if (loading) {
    return (
      <Layout>
        <LoadingIndicator title={description} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage title={error} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Switch>
        {routes.map(route => (
          <Route key={route.path || "not-found"} {...route} />
        ))}
      </Switch>
    </Layout>
  );
}
