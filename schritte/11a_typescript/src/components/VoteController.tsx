import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import { Vote, Choice } from "../types";

type VoteControllerProps = Readonly<{
  votes: ReadonlyArray<Vote>;
  currentVoteId: string;
  onRegisterVote: (vote: Vote, choice: Choice) => void;
  onDismissVote: () => void;
}>;

export default function VoteController({
  currentVoteId,
  votes,
  onRegisterVote,
  onDismissVote
}: VoteControllerProps) {
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
