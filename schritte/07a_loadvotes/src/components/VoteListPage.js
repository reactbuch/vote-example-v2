import React from "react";
import VoteController from "./VoteController";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import { fetchJson } from "../backend";

export default function VoteListPage() {
  const [allVotes, setAllVotes] = React.useState(null);

  async function loadVotes() {
    const votes = await fetchJson("/api/votes");
    setAllVotes(votes);
  }

  React.useEffect(() => {
    loadVotes();
  }, []);

  if (!allVotes) {
    return <VoteLoadingIndicator />;
  }

  return <VoteController votes={allVotes} />;
}
