import {
  apiRequestStart,
  apiRequestSuccess,
  apiRequestFailure
} from "api/actions";
import { fetchJson, sendJson } from "api/backend";

function setVotes(votes) {
  return {
    type: "SET_VOTES",
    votes
  };
}

export function loadVotesFromServer() {
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

function updateVote(vote) {
  return {
    type: "UPDATE_VOTE",
    vote
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
