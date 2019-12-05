import React from "react";
import ChoiceBar from "./ChoiceBar";
import Spinner from "./Spinner";

function RegisterChoiceSpinner() {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Registering choice</h3>
      <Spinner />
    </div>
  );
}

export default function VotingComponent({
  vote,
  onRegisterChoice,
  onDismissVote,
  registerChoiceRunning
}) {
  return (
    <div className="Row VotingRow Spacer">
      <div className="Head">
        <h1 className="Title">
          {vote.title}
          <div className="Badge">{vote.totalVotes} Votes</div>
        </h1>
        <div className="Description Emphasis">{vote.description}</div>
      </div>
      {registerChoiceRunning ? (
        <RegisterChoiceSpinner />
      ) : (
        <>
          <div>
            {vote.choices.map(choice => (
              <ChoiceBar
                key={choice.id}
                title={choice.title}
                percent={choice.count * (100 / vote.totalVotes)}
                count={choice.count}
                onClickHandler={() => onRegisterChoice(choice.id)}
              />
            ))}
          </div>
          <div className="ButtonBar">
            <div className="Button" onClick={onDismissVote}>
              Vote later
            </div>
          </div>
        </>
      )}
    </div>
  );
}
