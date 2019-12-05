import { fetchJson, sendJson } from "./backend";

export function login(username) {
  return {
    type: "LOGIN",
    username
  };
}

export function apiRequestStart(description) {
  return {
    type: "API_REQUEST_START",
    description
  };
}

export function apiRequestSuccess() {
  return {
    type: "API_REQUEST_SUCCESS"
  };
}

export function apiRequestFailure(error) {
  return {
    type: "API_REQUEST_FAILURE",
    error
  };
}

function setVotes(votes) {
  return {
    type: "SET_VOTES",
    votes
  };
}
function addVote(newVote) {
  return {
    type: "ADD_VOTE",
    newVote
  };
}

function updateVote(vote) {
  return {
    type: "UPDATE_VOTE",
    vote
  };
}

export function loadVotesFromServer() {
  return (dispatch, getState) => {
    if (getState().votes.length > 0) {
      return;
    }
    dispatch(apiRequestStart("Loading Votes"));
    return fetchJson("/api/votes").then(
      votes => {
        dispatch(setVotes(votes));
        dispatch(apiRequestSuccess());
      },
      error => {
        console.error(error);
        dispatch(apiRequestFailure(error));
      }
    );
  };
}

export function registerVoteOnServer(vote, choice) {
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

export function saveVoteOnServer(newVote) {
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
