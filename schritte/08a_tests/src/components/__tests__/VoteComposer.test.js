import React from "react";
import { render, fireEvent } from "@testing-library/react";

import VoteComposer from "../VoteComposer";

test("VoteComposer should work", () => {
  const onSaveHandler = jest.fn();
  const onDeactivateHandler = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <VoteComposer onSave={onSaveHandler} onDeactivate={onDeactivateHandler} />
  );

  const saveButton = getByText("Save");
  const titleInput = getByPlaceholderText("What do you want to know ?");
  const descriptionInput = getByPlaceholderText(
    "Describe your question in one sentence here"
  );

  // cancel button should work
  fireEvent.click(getByText("Cancel"));
  expect(onDeactivateHandler).toBeCalled();

  // save should be disabled until form is complete
  expect(saveButton).toBeDisabled();

  fireEvent.change(titleInput, { target: { value: "Does this work?" } });
  fireEvent.change(descriptionInput, { target: { value: "Let me know..." } });
  expect(saveButton).toBeDisabled();

  fireEvent.change(getByPlaceholderText("Choice #1"), {
    target: { value: "I think so" }
  });
  // save should be enabled now
  expect(saveButton).toBeEnabled();

  // there should be a second (empty) choice now
  expect(getByPlaceholderText("Choice #2")).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText("Choice #2"), {
    target: { value: "Unsure yet" }
  });
  expect(getByPlaceholderText("Choice #3")).toBeInTheDocument();

  // save should work now
  fireEvent.click(saveButton);

  expect(onSaveHandler).toBeCalledWith({
    title: "Does this work?",
    description: "Let me know...",
    choices: [{ title: "I think so" }, { title: "Unsure yet" }]
  });
});
