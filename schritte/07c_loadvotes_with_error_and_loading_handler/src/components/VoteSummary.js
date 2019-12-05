import React from "react";

export default function VoteSummary({ vote, onActivate }) {
  const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

  function handleClick() {
    onActivate(vote);
  }

  return (
    <div onClick={handleClick} className="Row VotesRow Selectable">
      <h1 className="Title">
        {vote.title}
        <div className="Badge">{totalVotes} Votes</div>
      </h1>

      <p className="Emphasis">{vote.description}</p>
    </div>
  );
}
