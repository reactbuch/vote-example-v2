import React from "react";
import VoteSummary from "./VoteSummary";

export default function VoteList({ allVotes }) {
  return (
    <div>
      {allVotes.map(vote => (
        <VoteSummary key={vote.id} vote={vote} />
      ))}
    </div>
  );
}
