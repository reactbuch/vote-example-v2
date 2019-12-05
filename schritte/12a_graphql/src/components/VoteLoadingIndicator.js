import React from "react";
import Spinner from "./Spinner";

export default function VoteLoadingIndicator({ title }) {
  return (
    <div className="VoteLoadingIndicator Row VotesRow">
      <div className="Head">
        <h1 className="Title">{title}</h1>
        <Spinner />
      </div>
    </div>
  );
}
