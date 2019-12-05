import React from "react";

export default function LoadingIndicator({ title }) {
  return (
    <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">{title}</h1>
        <div className="Spinner">
          <div className="bounce bounce1" />
          <div className="bounce bounce2" />
          <div className="bounce bounce3" />
        </div>
      </div>
    </div>
  );
}
