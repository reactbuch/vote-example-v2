import React from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import VoteListPage from "./components/VoteListPage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import VoteComposerPage from "./components/VoteComposerPage";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const location = useLocation();

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

  function login() {
    setLoggedIn(true);
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
              <LoginPage onSuccessfulLogin={login} />
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
