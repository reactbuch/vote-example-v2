import React from "react";

import { useSelector, shallowEqual } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import NotFoundPage from "./components/NotFoundPage";
import LoadingIndicator from "./components/LoadingIndicator";
import Layout from "./components/Layout";
import ErrorMessage from "./components/ErrorMessage";
import { AppState } from "./reducers";

const VoteListPage = React.lazy(() =>
  import(/* webpackChunkName: "VoteListPage" */ "./components/VoteListPage")
);

const LoginPage = React.lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ "./components/LoginPage")
);

const VoteComposerPage = React.lazy(() =>
  import(
    /* webpackChunkName: "VoteComposerPage" */ "./components/VoteComposerPage"
  )
);

// function useAppSelector<T>(fn: (state: AppState) => T): T {
//   return useSelector(fn);
// }

export default function App() {
  const location = useLocation();
  const loggedIn = useSelector((state: AppState) => {
    return state.login !== null;
  });

  const { loading, description, error } = useSelector(
    (state: AppState) => state.api,
    shallowEqual
  );

  function voteComposerOrLogin() {
    return loggedIn ? (
      <VoteComposerPage />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { redirectAfter: location.pathname }
        }}
      />
    );
  }

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
        <ErrorMessage msg={error} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <VoteListPage />
        </Route>

        <Route path="/votes/:voteId">
          <VoteListPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/compose">{voteComposerOrLogin()}</Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}
