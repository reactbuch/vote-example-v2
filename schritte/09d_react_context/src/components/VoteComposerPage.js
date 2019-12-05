import React from "react";
import { useHistory } from "react-router";
import VoteComposer from "./VoteComposer";
import { sendJson } from "../backend";

export default function VoteComposerPage() {
  const history = useHistory();

  async function addVote(vote) {
    await sendJson("POST", "/api/votes", vote);
    closeVoteComposer();
  }

  function closeVoteComposer() {
    history.push("/");
  }

  return <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />;
}
