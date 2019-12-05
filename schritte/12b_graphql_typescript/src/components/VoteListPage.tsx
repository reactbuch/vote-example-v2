import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";
import { VoteListQuery } from "./querytypes/VoteListQuery";

const VOTE_LIST_QUERY = gql`
  query VoteListQuery {
    allVotes: votes {
      id
      title
      description
      totalVotes: totalCount
    }
  }
`;

export default function VoteListPage() {
  const { loading, error, data, refetch } = useQuery<VoteListQuery>(
    VOTE_LIST_QUERY
  );

  if (loading) {
    return <VoteLoadingIndicator title="Loading Votes" />;
  }

  if (error) {
    console.error("Failed to load GraphQL Data", error);
    return <ErrorMessage msg="Could not load data" onRetry={refetch} />;
  }

  return (
    <div>
      <VoteList allVotes={data!.allVotes} />
      <InactiveVoteComposer />
    </div>
  );
}
