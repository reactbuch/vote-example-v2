import React from "react";
import NotFoundPage from "./components/NotFoundPage";
import VoteListPage, {
  loadInitialVoteListData
} from "./components/VoteListPage";
import LoginPage from "./components/LoginPage";
import VoteComposerPage from "./components/VoteComposerPage";

import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

function ComposerOrLogin() {
  const location = useLocation();
  const loggedIn = useSelector(state => {
    return state.login !== null;
  });

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

const routes = [
  {
    path: "/",
    exact: true,
    children: <VoteListPage />,
    loadData: loadInitialVoteListData
  },
  {
    path: "/votes/:voteId",
    exact: true,
    children: <VoteListPage />,
    loadData: loadInitialVoteListData
  },
  {
    path: "/login",
    children: <LoginPage />
  },
  {
    path: "/compose",
    children: <ComposerOrLogin />
  },
  {
    children: <NotFoundPage />
  }
];

export default routes;
