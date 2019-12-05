import React from "react";
import VoteSummary from "./VoteSummary";
import VotingComponent from "./VotingComponent";

export default function VoteList({
  allVotes,
  currentVoteId,
  onSelectVote,
  onRegisterVote,
  onDismissVote
}) {
  return (
    <div>
      {allVotes.map(vote =>
        vote.id === currentVoteId ? (
          <VotingComponent
            key={vote.id}
            vote={vote}
            onDismissVote={onDismissVote}
            onRegisterChoice={onRegisterVote}
          />
        ) : (
          <VoteSummary key={vote.id} vote={vote} onActivate={onSelectVote} />
        )
      )}
    </div>
  );
}
