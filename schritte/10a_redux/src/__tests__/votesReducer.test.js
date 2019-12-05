import { votesReducer } from "../reducers";

test("set new list of votes", () => {
  const oldState = ["A", "B", "C"];

  const newState = votesReducer(oldState, {
    type: "SET_VOTES",
    votes: [1, 2, 3]
  });

  expect(newState).toEqual([1, 2, 3]);
});

test("adds a new vote", () => {
  const oldState = ["A", "B", "C"];

  const newState = votesReducer(oldState, {
    type: "ADD_VOTE",
    newVote: "D"
  });

  expect(newState).toEqual(["A", "B", "C", "D"]);
});

test("updates a new vote", () => {
  const oldState = [
    { id: 1, count: 3 },
    { id: 2, count: 7 },
    { id: 3, count: 2 }
  ];

  const newState = votesReducer(oldState, {
    type: "UPDATE_VOTE",
    vote: {
      id: 2,
      count: 8
    }
  });

  expect(newState).toEqual([
    { id: 1, count: 3 },
    { id: 2, count: 8 },
    { id: 3, count: 2 }
  ]);
});
