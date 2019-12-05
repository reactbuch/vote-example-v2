import { loadVotesFromServer } from "../voteListActions";
test("loadVotesFromServer", () => {
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ votes: [1] }));

  loadVotesFromServer()(dispatch, getState);
  expect(dispatch).not.toHaveBeenCalled();
  expect(getState).toHaveBeenCalled();
});

jest.mock("api/backend", () => {
  return {
    fetchJson: () => ({
      then: fn => fn(["v1", "v2"])
    })
  };
});

test("loadVotesFromServer", async () => {
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ votes: [] }));

  loadVotesFromServer()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "API_REQUEST_START"
    })
  );
  expect(dispatch).toHaveBeenCalledWith({
    type: "SET_VOTES",
    votes: ["v1", "v2"]
  });
  expect(dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "API_REQUEST_SUCCESS"
    })
  );
});
