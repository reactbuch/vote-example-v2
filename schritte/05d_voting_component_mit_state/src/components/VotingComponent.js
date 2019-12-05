import React from "react";
import ChoiceBar from "./ChoiceBar";

export default function VotingComponent({ vote: initialVote }) {
  const [vote, setVote] = React.useState(initialVote);

  const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

  function registerChoice(choice) {
    setVote({
      ...vote,
      choices: vote.choices.map(c =>
        choice.id !== c.id ? c : { ...choice, count: choice.count + 1 }
      )
    });
  }

  return (
    <div className="Row VotingRow Spacer">
      <div className="Head">
        <h1 className="Title">
          {vote.title}
          <div className="Badge">{totalVotes} Votes</div>
        </h1>
        <div className="Description Emphasis">{vote.description}</div>
      </div>
      <div>
        {vote.choices.map(choice => (
          <ChoiceBar
            key={choice.id}
            title={choice.title}
            percent={choice.count * (100 / totalVotes)}
            count={choice.count}
            onClickHandler={() => registerChoice(choice)}
          />
        ))}
      </div>
    </div>
  );
}
