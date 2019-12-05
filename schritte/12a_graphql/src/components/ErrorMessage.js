import React from "react";

export default function ErrorMessage({ msg, onRetry }) {
  return (
    <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">An error occured!</h1>
      </div>

      <div className="Body">{msg}</div>
      {onRetry && (
        <div className="ButtonBar">
          <button className="Button" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
