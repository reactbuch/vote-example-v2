import React from "react";
import Spinner from "./Spinner";

type VoteLoadingIndicatorProps = {
  title: string;
};
export default function VoteLoadingIndicator({
  title
}: VoteLoadingIndicatorProps) {
  return (
    <div className="VoteLoadingIndicator Row VotesRow">
      <div className="Head">
        <h1 className="Title">{title}</h1>
        <Spinner />
      </div>
    </div>
  );
}
