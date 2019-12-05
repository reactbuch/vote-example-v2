import React from "react";
import { useParams, useHistory } from "react-router";
import VoteController from "./VoteController";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import { fetchJson, sendJson } from "../backend";
import ErrorMessage from "./ErrorMessage";

const initialState = {
  loading: true,
  error: null,
  allVotes: null
};

export function voteListReducer(state, action) {
  switch (action.type) {
    case "START_REQUEST":
      return { loading: true, allVotes: state.allVotes };
    case "LOAD_VOTES_FAILURE":
      return { error: action.error.toString(), allVotes: null };
    case "LOAD_VOTES_SUCCESS":
      return { allVotes: action.votes };
    case "ADD_VOTE_SUCCESS":
      const newVotes = state.allVotes
        ? [...state.allVotes, action.newVote]
        : [action.newVote];
      return { allVotes: newVotes };
    default:
      throw new Error(`Invalid action: ${action.type}`);
  }
}

export default function VoteListPage() {
  const currentVoteId = useParams().voteId;
  const history = useHistory();

  const [state, dispatch] = React.useReducer(voteListReducer, initialState);

  React.useEffect(() => {
    loadVotes();
  }, []);

  async function loadVotes() {
    dispatch({ type: "START_REQUEST" });

    try {
      const votes = await fetchJson("/api/votes");
      dispatch({
        type: "LOAD_VOTES_SUCCESS",
        votes
      });
    } catch (error) {
      dispatch({
        type: "LOAD_VOTES_FAILURE",
        error
      });
    }
  }

  async function registerVote(vote, choice) {
    dispatch({ type: "START_REQUEST" });
    await sendJson("PUT", `/api/votes/${vote.id}/choices/${choice.id}/vote`);
    loadVotes();
  }

  if (state.loading) {
    return <VoteLoadingIndicator />;
  }

  if (state.error) {
    return <ErrorMessage msg={state.error} onRetry={loadVotes} />;
  }

  function dismissVote() {
    history.push("/");
  }

  return (
    <VoteController
      votes={state.allVotes}
      currentVoteId={currentVoteId}
      onRegisterVote={registerVote}
      onDismissVote={dismissVote}
    />
  );
}
