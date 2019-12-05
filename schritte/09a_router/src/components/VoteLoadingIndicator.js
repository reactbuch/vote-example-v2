import React from "react";

export default function VoteLoadingIndicator() {
  return (
    <div className="Row VotingRow Spacer">
      <div className="Spinner">
        <div className="bounce bounce1" />
        <div className="bounce bounce2" />
        <div className="bounce bounce3" />
      </div>
    </div>
  );
}
