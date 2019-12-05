import React from "react";
import VoteSummary from "./VoteSummary";
import { VoteData } from "../types";

type VoteListProps = {
  allVotes: ReadonlyArray<VoteData>;
};

export default function VoteList({ allVotes }: VoteListProps) {
  return (
    <div>
      {allVotes.map(vote => (
        <VoteSummary key={vote.id} vote={vote} />
      ))}
    </div>
  );
}
