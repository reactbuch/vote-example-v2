import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
  const { getByText, queryByText, queryByPlaceholderText } = render(
    <VoteController
      votes={theVotes}
      onSaveVote={onSaveVoteHandler}
      onRegisterVote={onRegisterVoteHandler}
    />
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
  // submit a choice
  fireEvent.click(queryByText("Not sure yet"));
  // submit a choice for the active vote
  expect(onRegisterVoteHandler).toHaveBeenCalledWith(
    theVotes[0],
    theVotes[0].choices[2]
  );

  // open vote composer
  fireEvent.click(queryByText("Click here to leave your own question."));
  expect(
    queryByPlaceholderText("What do you want to know ?")
  ).toBeInTheDocument();
  // no vote must be active, so no choices visible
  expect(queryByText("JavaScript")).not.toBeInTheDocument();
  expect(queryByText("Good")).not.toBeInTheDocument();
  fireEvent.click(getByText("Cancel"));
  expect(
    queryByPlaceholderText("What do you want to know ?")
  ).not.toBeInTheDocument();
});
