import React from "react";
import { render, fireEvent } from "@testing-library/react";
import VotingComponent from "../VotingComponent";
const theVote = {
  id: "vote_1",
  title: "How is your day?",
  description: "Tell me: how has your day been so far?",
  choices: [
    { id: "choice_1", title: "Good", count: 7 },
    { id: "choice_2", title: "Bad", count: 12 },
    { id: "choice_3", title: "Not sure yet", count: 1 }
  ]
};

test("that it renders and buttons work", () => {
  const onRegisterChoiceHandler = jest.fn();
  const onDismissVoteHandler = jest.fn();

  const { getByText } = render(
    <VotingComponent
      vote={theVote}
      onRegisterChoice={onRegisterChoiceHandler}
      onDismissVote={onDismissVoteHandler}
    />
  );

  expect(getByText("Good")).toBeVisible();
  expect(getByText("Bad")).toBeVisible();
  expect(getByText("Not sure yet")).toBeVisible();

  fireEvent.click(getByText("Vote later"));
  expect(onDismissVoteHandler).toHaveBeenCalled();

  fireEvent.click(getByText("Bad"));
  expect(onRegisterChoiceHandler).toHaveBeenCalledWith(
    theVote,
    theVote.choices[1]
  );
});
