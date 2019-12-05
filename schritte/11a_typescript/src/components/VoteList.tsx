import React from "react";
import VoteSummary from "./VoteSummary";
import VotingComponent from "./VotingComponent";
import { Vote, Choice } from "../types";

type VoteListProps = {
  allVotes: ReadonlyArray<Vote>;
  currentVoteId: string;
  onRegisterVote: (vote: Vote, choice: Choice) => void;
  onDismissVote: () => void;
};

export default function VoteList({
  allVotes,
  currentVoteId,
  onRegisterVote,
  onDismissVote
}: VoteListProps) {
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
          <VoteSummary key={vote.id} vote={vote} />
        )
      )}
    </div>
  );
}
