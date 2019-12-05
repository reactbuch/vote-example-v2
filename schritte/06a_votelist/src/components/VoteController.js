import React from "react";
import VoteList from "./VoteList";

export default function VoteController({ initialVotes }) {
  const [allVotes, setAllVotes] = React.useState(initialVotes);
  const [currentVoteId, setCurrentVoteId] = React.useState(null);

  function setCurrentVote(vote) {
    setCurrentVoteId(vote.id);
  }

  function unsetCurrentVote() {
    setCurrentVoteId(null);
  }

  function registerVote(vote, choice) {
    const newVotes = allVotes.map(v =>
      v.id !== vote.id
        ? v
        : {
            ...vote,
            choices: vote.choices.map(c =>
              c.id !== choice.id ? c : { ...c, count: c.count + 1 }
            )
          }
    );

    setAllVotes(newVotes);
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
    </div>
  );
}
