import React from "react";
import * as actions from "../actions";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";

export default function VoteListPage() {
  const dispatch = useDispatch();
  const allVotes = useSelector(state => state.votes);
  const currentVoteId = useParams().voteId;
  const history = useHistory();

  React.useEffect(() => {
    dispatch(actions.loadVotesFromServer());
  }, [dispatch]);

  function registerVote(vote, choice) {
    dispatch(actions.registerVoteOnServer(vote, choice));
  }

  function dismissVote() {
    history.push("/");
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onRegisterVote={registerVote}
        onDismissVote={dismissVote}
      />
      <InactiveVoteComposer />
    </div>
  );
}
