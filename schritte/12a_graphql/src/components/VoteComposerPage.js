import React from "react";
import { useHistory } from "react-router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import VoteComposer from "./VoteComposer";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import ErrorMessage from "./ErrorMessage";

const ADD_VOTE_MUTATION = gql`
  mutation AddVote($newVote: NewVote!) {
    savedVote: addVote(newVote: $newVote) {
      id
      title
      description
      totalCount
    }
  }
`;

const READ_VOTES_QUERY = gql`
  query ReadVotes {
    votes {
      id
    }
  }
`;

export default function VoteComposerPage() {
  const history = useHistory();
  const [addVoteMutation, { loading, error }] = useMutation(ADD_VOTE_MUTATION);

  async function addVote(newVote) {
    await addVoteMutation({
      variables: { newVote },
      update(cache, { data }) {
        const { votes } = cache.readQuery({
          query: READ_VOTES_QUERY
        });
        cache.writeQuery({
          query: READ_VOTES_QUERY,
          data: { votes: votes.concat(data.savedVote) }
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
