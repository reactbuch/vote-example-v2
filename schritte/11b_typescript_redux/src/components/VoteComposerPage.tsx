import React from "react";
import { useHistory } from "react-router";
import VoteComposer from "./VoteComposer";
import { useDispatch } from "react-redux";
import { saveVoteOnServer } from "../actions";
import { UnsavedVote } from "../types";

export default function VoteComposerPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  async function addVote(vote: UnsavedVote) {
    dispatch(saveVoteOnServer(vote));
    closeVoteComposer();
  }

  function closeVoteComposer() {
    history.push("/");
  }

  return <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />;
}
