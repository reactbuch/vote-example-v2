import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import VoteController from "../VoteController";
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

test("that it renders and buttons work", () => {
  const onSaveVoteHandler = jest.fn();
  const onRegisterVoteHandler = jest.fn();

  // votes, onSaveVote, onRegisterVote
  const history = createMemoryHistory();
  const { getByText, queryByText, queryByPlaceholderText } = render(
    <Router history={history}>
      <VoteController
        votes={theVotes}
        onSaveVote={onSaveVoteHandler}
        onRegisterVote={onRegisterVoteHandler}
      />
    </Router>
  );

  // votes (summary) and composer must be visible
  expect(queryByText("How is your day?")).toBeInTheDocument();
  expect(queryByText("Programming languages")).toBeInTheDocument();
  expect(
    queryByText("Click here to leave your own question.")
  ).toBeInTheDocument();
  // no vote must be active, so no choices visible
  expect(queryByText("JavaScript")).not.toBeInTheDocument();
  expect(queryByText("Good")).not.toBeInTheDocument();

  // open first vote
  fireEvent.click(getByText("How is your day?"));
  // note that the component is not rerendered again, as we don't
  // have our route configurations here in our test
  expect(history.location.pathname).toBe("/votes/vote_1");
});
