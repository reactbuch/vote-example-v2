import React from "react";
import { useParams, useHistory } from "react-router";
import VoteController from "./VoteController";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import { fetchJson, sendJson } from "../backend";
import ErrorMessage from "./ErrorMessage";
import { Vote, Choice } from "../types";

type VoteListPageState = Readonly<{
  loading?: boolean;
  error?: string | null;
  allVotes: ReadonlyArray<Readonly<Vote>> | null;
}>;

type StartRequestAction = Readonly<{
  type: "START_REQUEST";
}>;

type LoadVotesFailureAction = Readonly<{
  type: "LOAD_VOTES_FAILURE";
  error: {};
}>;

type LoadVotesSuccessAction = Readonly<{
  type: "LOAD_VOTES_SUCCESS";
  votes: Vote[];
}>;

type AddVoteSuccessAction = Readonly<{
  type: "ADD_VOTE_SUCCESS";
  newVote: Vote;
}>;

const initialState: VoteListPageState = {
  loading: true,
  error: null,
  allVotes: null
};

export function voteListReducer(
  state: VoteListPageState,
  action:
    | StartRequestAction
    | LoadVotesFailureAction
    | LoadVotesSuccessAction
    | AddVoteSuccessAction
): VoteListPageState {
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
      throw new Error(`Invalid action: ${action!.type}`);
  }
}

type VoteListPageUrlParams = {
  voteId: string | undefined;
};

export default function VoteListPage() {
  const currentVoteId = useParams<VoteListPageUrlParams>().voteId;
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

  async function registerVote(vote: Vote, choice: Choice) {
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
      votes={state.allVotes!}
      currentVoteId={currentVoteId}
      onRegisterVote={registerVote}
      onDismissVote={dismissVote}
    />
  );
}
