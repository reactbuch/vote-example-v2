import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import VoteList from "../VoteList";
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
  const onSelectVoteHandler = jest.fn();
  const onRegisterVoteHandler = jest.fn();
  const onDismissVoteHandler = jest.fn();

  const history = createMemoryHistory();

  const { getByText, queryByText } = render(
    <Router history={history}>
      <VoteList
        currentVoteId="vote_2"
        allVotes={theVotes}
        onSelectVote={onSelectVoteHandler}
        onRegisterVote={onRegisterVoteHandler}
        onDismissVote={onDismissVoteHandler}
      />
    </Router>
  );

  // "active" vote
  expect(getByText("JavaScript")).toBeInTheDocument();
  expect(getByText("Java")).toBeInTheDocument();
  expect(getByText("Plain english")).toBeInTheDocument();

  // "inactive" must not be visible (except: title)
  expect(getByText("How is your day?")).toBeInTheDocument();
  expect(queryByText("Good")).not.toBeInTheDocument();
  expect(queryByText("Bad")).not.toBeInTheDocument();
  expect(queryByText("Not sure yet")).not.toBeInTheDocument();

  // submit a choice for the active vote
  fireEvent.click(getByText("Plain english"));
  expect(onRegisterVoteHandler).toHaveBeenCalledWith(
    theVotes[1],
    theVotes[1].choices[2]
  );

  // test dismiss
  fireEvent.click(getByText("Vote later"));
  expect(onDismissVoteHandler).toHaveBeenCalled();

  // open first vote
  fireEvent.click(getByText("How is your day?"));
  expect(history.location.pathname).toBe("/votes/vote_1");
});
