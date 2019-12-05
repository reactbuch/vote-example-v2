import React from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import VoteListPage from "./components/VoteListPage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import VoteComposerPage from "./components/VoteComposerPage";
import { useLogin } from "./components/LoginProvider";

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
        </div>
      </div>
    </div>
  );
}
