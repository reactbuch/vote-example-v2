import React from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import NotFoundPage from "./components/NotFoundPage";
import { useLogin } from "./components/LoginProvider";
import LoadingIndicator from "./components/LoadingIndicator";

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

export default function App() {
  const location = useLocation();
  const { loggedIn } = useLogin();

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

  return (
    <div className="Background">
      <div className="Header">
        <div className="Title">Vote as a Service</div>
      </div>

      <div className="Main">
        <div className="Container">
          <React.Suspense fallback={<LoadingIndicator />}>
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
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
