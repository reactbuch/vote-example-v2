import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import VoteController from "../VoteController";
import LoginProvider from "../LoginProvider";
const theVotes = [
  {
    id: "vote_1",
    title: "How is your day?",
    description: "Tell me: how has your day been so far?",
    choices: [
      { id: "choice_1", title: "Good", count: 7 },
      { id: "choice_2", title: "Bad", count: 12 },
      { id: "choice_3", title: "Not sure yet", count: 1 }
    ]
  },
  {
    id: "vote_2",
    title: "Programming languages",
    description: "What is your preferred language?",
    choices: [
      { id: "choice_1", title: "JavaScript", count: 5 },
      { id: "choice_2", title: "Java", count: 9 },
      { id: "choice_3", title: "Plain english", count: 17 }
    ]
  }
];

test("that it renders and buttons work", async () => {
  const onSaveVoteHandler = jest.fn();
  const onRegisterVoteHandler = jest.fn();

  const history = createMemoryHistory();
  const { getByText, queryByText } = render(
    <Router history={history}>
      <LoginProvider>
        <VoteController
          votes={theVotes}
          onSaveVote={onSaveVoteHandler}
          onRegisterVote={onRegisterVoteHandler}
        />
      </LoginProvider>
    </Router>
  );

  // votes (summary) and composer must be visible
  expect(queryByText("How is your day?")).toBeInTheDocument();
  expect(queryByText("Programming languages")).toBeInTheDocument();
  expect(
    queryByText(/(You need to be logged in to add Votings)/)
  ).toBeInTheDocument();
  // no vote must be active, so no choices visible
  expect(queryByText("JavaScript")).not.toBeInTheDocument();
  expect(queryByText("Good")).not.toBeInTheDocument();

  // open first vote
  fireEvent.click(getByText("How is your day?"));

  // not that the component is not rerendered again, was we don't
  // have our route configurations here in our test
  expect(history.location.pathname).toBe("/votes/vote_1");
  //
});
