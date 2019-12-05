import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import VoteComposer from "./VoteComposer";

export default function VoteController({
  currentVoteId,
  votes,
  onSaveVote,
  onRegisterVote,
  onDismissVote
}) {
  const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  function closeVoteComposer() {
    setVoteComposerActive(false);
  }

  function openVoteComposer() {
    // unsetCurrentVote();
    setVoteComposerActive(true);
  }

  function saveVote(vote) {
    closeVoteComposer();
    onSaveVote(vote);
  }

  return (
    <div>
      <VoteList
        allVotes={votes}
        currentVoteId={currentVoteId}
        onRegisterVote={onRegisterVote}
        onDismissVote={onDismissVote}
      />
      {voteComposerActive ? (
        <VoteComposer onDeactivate={closeVoteComposer} onSave={saveVote} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
