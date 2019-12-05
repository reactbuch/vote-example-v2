import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";

export default function VoteController({
  currentVoteId,
  votes,
  onRegisterVote,
  onDismissVote
}) {
  return (
    <div>
      <VoteList
        allVotes={votes}
        currentVoteId={currentVoteId}
        onRegisterVote={onRegisterVote}
        onDismissVote={onDismissVote}
      />
      <InactiveVoteComposer />
    </div>
  );
}
