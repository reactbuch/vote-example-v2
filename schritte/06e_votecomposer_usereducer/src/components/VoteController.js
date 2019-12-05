import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import VoteComposer from "./VoteComposer";

function voteControllerReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_VOTE":
      return {
        ...state,
        currentVoteId: action.vote.id,
        voteComposerActive: false
      };
    case "UNSET_CURRENT_VOTE":
      return { ...state, currentVoteId: null };
    case "CLOSE_VOTE_COMPOSER":
      return { ...state, voteComposerActive: false };
    case "OPEN_VOTE_COMPOSER":
      return { ...state, currentVoteId: null, voteComposerActive: true };
    case "ADD_VOTE":
      return {
        ...state,
        voteComposerActive: false,
        allVotes: [...state.allVotes, action.vote]
      };
    case "REGISTER_VOTE":
      const { vote, choice } = action;

      const newVotes = state.allVotes.map(v =>
        v.id !== vote.id
          ? v
          : {
              ...vote,
              choices: vote.choices.map(c =>
                c.id !== choice.id ? c : { ...c, count: c.count + 1 }
              )
            }
      );

      return {
        ...state,
        allVotes: newVotes
      };
    default:
      throw new Error(`Invalid action: ${action.type}`);
  }
}

export default function VoteController({ initialVotes }) {
  const [
    { allVotes, currentVoteId, voteComposerActive },
    dispatch
  ] = React.useReducer(voteControllerReducer, {
    allVotes: initialVotes,
    currentVoteId: null,
    voteComposerActive: false
  });

  function setCurrentVote(vote) {
    dispatch({
      type: "SET_CURRENT_VOTE",
      vote
    });
  }

  function unsetCurrentVote() {
    dispatch({
      type: "UNSET_CURRENT_VOTE"
    });
  }

  function closeVoteComposer() {
    dispatch({
      type: "CLOSE_VOTE_COMPOSER"
    });
  }

  function openVoteComposer() {
    dispatch({
      type: "OPEN_VOTE_COMPOSER"
    });
  }

  function addVote(vote) {
    dispatch({
      type: "ADD_VOTE",
      vote
    });
  }

  function registerVote(vote, choice) {
    dispatch({
      type: "REGISTER_VOTE",
      vote,
      choice
    });
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
      {voteComposerActive ? (
        <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
