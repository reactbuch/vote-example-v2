import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import VoteComposer from "./VoteComposer";

// return <VoteController votes={pageState.allVotes}
//     currentPage={pageState.currentPage}
//     totalPages={pageState.totalPages}
//     onNextPage={pageState.hasNextPage ? handleOnNextPage : undefined}
//     onPrevPave={pageState.hasPrevPage ? handleOnPrevPage : undefined}
//   />;

export default function VoteController({
  votes,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) {
  const [allVotes, setAllVotes] = React.useState(votes);
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

  function addVote(vote) {
    setAllVotes([...allVotes, vote]);
    closeVoteComposer();
  }

  function registerVote(vote, choice) {
    const newVotes = allVotes.map((v) =>
      v.id !== vote.id
        ? v
        : {
            ...vote,
            choices: vote.choices.map((c) =>
              c.id !== choice.id ? c : { ...c, count: c.count + 1 }
            ),
          }
    );

    setAllVotes(newVotes);
  }

  return (
    <div>
      <div className="Row">
        <div className="ButtonBar">
          <button
            className="Button"
            disabled={!onPrevPage}
            onClick={onPrevPage}
          >
            Prev
          </button>
          {currentPage} / {totalPages}
          <button
            className="Button"
            disabled={!onNextPage}
            onClick={onNextPage}
          >
            Next
          </button>
        </div>
      </div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
      {voteComposerActive ? (
        <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
