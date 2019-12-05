import React from "react";

import { Link } from "react-router-dom";

export default function InactiveVoteComposer() {
  return (
    <div className="Row VotesRow Spacer">
      <Link to="/compose">
        <h1 className="Title">
          <span className="Emphasis">
            What do <b>you</b> want to know ?
          </span>

          <div className="Badge">Add Voting</div>
        </h1>
        <p>Click here to leave your own question.</p>
      </Link>
    </div>
  );
}
