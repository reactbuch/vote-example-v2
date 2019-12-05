import React from "react";
import VoteController from "./VoteController";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import { fetchJson, sendJson } from "../backend";

export default function VoteListPage() {
  const [allVotes, setAllVotes] = React.useState(null);

  async function loadVotes() {
    const votes = await fetchJson("/api/votes");
    setAllVotes(votes);
  }

  React.useEffect(() => {
    loadVotes();
  }, []);

  async function registerVote(vote, choice) {
    await sendJson("PUT", `/api/votes/${vote.id}/choices/${choice.id}/vote`);
    loadVotes();
  }

  async function addVote(vote) {
    const newVote = await sendJson("POST", "/api/votes", vote);
    setAllVotes(currentVotes => [...currentVotes, newVote]);
  }

  if (!allVotes) {
    return <VoteLoadingIndicator />;
  }

  return (
    <VoteController
      votes={allVotes}
      onRegisterVote={registerVote}
      onSaveVote={addVote}
    />
  );
}
