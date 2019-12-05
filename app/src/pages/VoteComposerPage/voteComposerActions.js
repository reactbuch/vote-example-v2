import {
  apiRequestStart,
  apiRequestSuccess,
  apiRequestFailure
} from "api/actions";
import { sendJson } from "api/backend";

function addVote(newVote) {
  return {
    type: "ADD_VOTE",
    newVote
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
