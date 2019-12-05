import React from "react";
import { useHistory } from "react-router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import VoteComposer from "./VoteComposer";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import {
  AddVoteMutation,
  AddVoteMutationVariables
} from "./querytypes/AddVoteMutation";
import { NewVote } from "../global-query-types";
import { ReadVotesQuery } from "./querytypes/ReadVotesQuery";

const ADD_VOTE_MUTATION = gql`
  mutation AddVoteMutation($newVote: NewVote!) {
    storedVote: addVote(newVote: $newVote) {
      id
      title
      description
      totalCount
    }
  }
`;

const READ_VOTES_QUERY = gql`
  query ReadVotesQuery {
    votes {
      id
    }
  }
`;

export default function VoteComposerPage() {
  const history = useHistory();
  const [addVoteMutation, { loading, error }] = useMutation<
    AddVoteMutation,
    AddVoteMutationVariables
  >(ADD_VOTE_MUTATION);

  async function addVote(newVote: NewVote) {
    await addVoteMutation({
      variables: { newVote },
      update(cache, { data }) {
        const { votes } = cache.readQuery<ReadVotesQuery>({
          query: READ_VOTES_QUERY
        }) || { votes: [] };
        cache.writeQuery({
          query: READ_VOTES_QUERY,
          data: { votes: votes.concat(data!.storedVote) }
        });
      }
    });

    closeVoteComposer();
  }

  function closeVoteComposer() {
    history.push("/");
  }

  if (error) {
    return <ErrorMessage msg="Saving Vote failed" />;
  }

  return loading ? (
    <VoteLoadingIndicator title="Saving Vote..." />
  ) : (
    <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />
  );
}
