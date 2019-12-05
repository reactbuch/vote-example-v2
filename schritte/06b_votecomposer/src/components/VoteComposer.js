import React from "react";

export default function VoteComposer({ onDeactivate }) {
  return (
    <div className="Row VoteComposer Spacer">
      <div className="Head">
        <h1 className="Title">
          <input
            className="Title"
            autoFocus
            name="title"
            type="text"
            placeholder="What do you want to know ?"
          />
        </h1>
        <input
          className="Description"
          name="description"
          type="text"
          placeholder="Describe your question in one sentence here"
        />
      </div>

      <div className="ButtonBar">
        <button className="Button">Save</button>
        <button className="Button" onClick={onDeactivate}>
          Cancel
        </button>
      </div>
    </div>
  );
}
