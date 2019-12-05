import React from "react";
import { Link } from "react-router-dom";
import { VoteData } from "../types";

type VoteSummaryProps = {
  vote: VoteData;
};

export default function VoteSummary({ vote }: VoteSummaryProps) {
  return (
    <div className="Row VotesRow Selectable">
      <Link to={`/votes/${vote.id}`}>
        <h1 className="Title">
          {vote.title}
          <div className="Badge">{vote.totalVotes} Votes</div>
        </h1>

        <p className="Emphasis">{vote.description}</p>
      </Link>
    </div>
  );
}
