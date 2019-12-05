import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import configureStore from "../../configureStore";
import App from "../../App";

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

afterEach(() => {
  jest.restoreAllMocks();
});

test("that it loads data and renders (with fetch mock)", async () => {
  // https://github.com/testing-library/react-testing-library#complex-example

  const fetchMock = jest
    .spyOn(window, "fetch")
    .mockImplementationOnce(
      // note that we dont have to use async functions here,
      // as 'await' (in our code) also works for non-await functions
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/await#Syntax
      () => ({
        ok: () => true,
        json: () => theVotes
      })
    )
    .mockImplementationOnce(
      // note that we dont have to use async functions here,
      // as 'await' (in our code) also works for non-await functions
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/await#Syntax
      () => ({
        ok: () => true,
        json: jest.fn()
      })
    )
    .mockImplementationOnce(
      // note that we dont have to use async functions here,
      // as 'await' (in our code) also works for non-await functions
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/await#Syntax
      () => ({
        ok: () => true,
        json: () => theVotes
      })
    );

  // Console warnings 'An update to .. inside a test was not wrapped":
  // https://github.com/testing-library/react-testing-library/issues/281
  // will disappear with React 16.9
  const history = createMemoryHistory();
  const store = configureStore();
  const { container, queryByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={App} />
      </Router>
    </Provider>
  );
  const spinner = container.querySelector(".Spinner");
  expect(spinner).toBeInTheDocument();

  // DEMO ONLY: as the outstanding promises from fetch(mock) and
  // 'backend.js' have not been resolved yet, we cannot use
  // queryByText here, but need to use waitForElement (see below)
  expect(queryByText("Programming languages")).not.toBeInTheDocument();

  // wait until promise from fetch is resolved
  const vote = await waitForElement(() => queryByText("Programming languages"));
  expect(vote).toBeInTheDocument();

  expect(fetchMock).toHaveBeenCalledWith(
    "http://localhost:3000/api/votes?slow"
  );

  fireEvent.click(vote);
  expect(history.location.pathname).toBe("/votes/vote_2");
});
