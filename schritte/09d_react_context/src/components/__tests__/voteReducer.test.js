import { voteListReducer } from "../VoteListPage";

test("handle START_REQUEST action", () => {
  const oldState = {};
  const newState = voteListReducer(oldState, { type: "START_REQUEST" });
  expect(newState).toEqual({
    loading: true
  });
});

test("handle LOAD_VOTES_FAILURE action", () => {
  const oldState = { allVotes: [1, 2, 3], loading: true };
  const newState = voteListReducer(oldState, {
    type: "LOAD_VOTES_FAILURE",
    error: "Some thing failed"
  });
  expect(newState).toEqual({
    error: "Some thing failed",
    allVotes: null
  });
});

test("handle LOAD_VOTES_SUCCESS", () => {
  const oldState = { allVotes: [1, 2, 3], loading: true };
  const newState = voteListReducer(oldState, {
    type: "LOAD_VOTES_SUCCESS",
    votes: [4, 5, 6]
  });
  expect(newState).toEqual({
    allVotes: [4, 5, 6]
  });
});

test("handle ADD_VOTE_SUCCESS", () => {
  const oldState = { allVotes: [1, 2, 3] };
  const newState = voteListReducer(oldState, {
    type: "ADD_VOTE_SUCCESS",
    newVote: 99
  });
  expect(newState).toEqual({
    allVotes: [1, 2, 3, 99]
  });
});
