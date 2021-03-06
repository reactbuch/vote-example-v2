import React from "react";

import { Route, Switch } from "react-router-dom";

import VoteListPage from "./components/VoteListPage";
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
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
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
