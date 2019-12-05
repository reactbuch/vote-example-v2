import { fetchJson, sendJson } from "./backend";
import { Vote, Choice, UnsavedVote } from "./types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "./reducers";

export function login(username: string) {
  return {
    type: "LOGIN",
    username
  } as const;
}

export type LoginAction = ReturnType<typeof login>;

export function apiRequestStart(description: string) {
  return {
    type: "API_REQUEST_START",
    description
  } as const;
}

export type ApiRequestStartAction = ReturnType<typeof apiRequestStart>;

export function apiRequestSuccess() {
  return {
    type: "API_REQUEST_SUCCESS"
  } as const;
}

export type ApiRequestSuccessAction = ReturnType<typeof apiRequestSuccess>;

export function apiRequestFailure(error: string) {
  return {
    type: "API_REQUEST_FAILURE",
    error
  } as const;
}

export type ApiRequestFailureAction = ReturnType<typeof apiRequestFailure>;

function setVotes(votes: Vote[]) {
  return {
    type: "SET_VOTES",
    votes
  } as const;
}

export type SetVotesAction = ReturnType<typeof setVotes>;

function addVote(newVote: Vote) {
  return {
    type: "ADD_VOTE",
    newVote
  } as const;
}

export type AddVoteAction = ReturnType<typeof addVote>;

function updateVote(vote: Vote) {
  return {
    type: "UPDATE_VOTE",
    vote
  } as const;
}

export type UpdateVoteAction = ReturnType<typeof updateVote>;

type ApiAction =
  | ApiRequestStartAction
  | ApiRequestSuccessAction
  | ApiRequestFailureAction;

export function loadVotesFromServer(): ThunkAction<
  void,
  AppState,
  void,
  ApiAction | SetVotesAction
> {
  return (dispatch, getState) => {
    if (getState().votes.length > 0) {
      return;
    }
    dispatch(apiRequestStart("Loading Votes"));
    fetchJson("/api/votes").then(
      votes => {
        dispatch(setVotes(votes));
        dispatch(apiRequestSuccess());
      },
      error => dispatch(apiRequestFailure(error))
    );
  };
}

export function registerVoteOnServer(
  vote: Vote,
  choice: Choice
): ThunkAction<void, AppState, void, ApiAction | UpdateVoteAction> {
  return dispatch => {
    dispatch(apiRequestStart("Registering your Choice"));

    sendJson("put", `/api/votes/${vote.id}/choices/${choice.id}/vote`).then(
      vote => {
        dispatch(updateVote(vote));
        dispatch(apiRequestSuccess());
      },
      error => dispatch(apiRequestFailure(error))
    );
  };
}

export function saveVoteOnServer(
  newVote: UnsavedVote
): ThunkAction<void, AppState, void, ApiAction | AddVoteAction> {
  return dispatch => {
    dispatch(apiRequestStart("Saving your Vote"));
    sendJson("post", "/api/votes", newVote).then(
      savedVote => {
        dispatch(addVote(savedVote));
        dispatch(apiRequestSuccess());
      },
      error => dispatch(apiRequestFailure(error))
    );
  };
}
