import React from "react";

export default function InactiveVoteComposer({ onActivate }) {
  return (
    <div className="Row VotesRow Spacer" onClick={onActivate}>
      <h1 className="Title">
        <span className="Emphasis">
          What do <b>you</b> want to know ?
        </span>

        <div className="Badge">Add Voting</div>
      </h1>
      <p>Click here to leave your own question.</p>
    </div>
  );
}
