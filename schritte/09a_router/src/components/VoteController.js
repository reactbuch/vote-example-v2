import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import VoteComposer from "./VoteComposer";

export default function VoteController({ votes, onSaveVote, onRegisterVote }) {
  const [currentVoteId, setCurrentVoteId] = React.useState(null);
  const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  function setCurrentVote(vote) {
    closeVoteComposer();
    setCurrentVoteId(vote.id);
  }

  function unsetCurrentVote() {
    setCurrentVoteId(null);
  }

  function closeVoteComposer() {
    setVoteComposerActive(false);
  }

  function openVoteComposer() {
    unsetCurrentVote();
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
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={onRegisterVote}
      />
      {voteComposerActive ? (
        <VoteComposer onDeactivate={closeVoteComposer} onSave={saveVote} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
