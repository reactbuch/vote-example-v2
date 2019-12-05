import React from "react";
import { useHistory, useParams } from "react-router";
import gql from "graphql-tag";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import VotingComponent from "./VotingComponent";

const SINGLE_VOTE_QUERY = gql`
  query SingleVoteQuery($voteId: ID!) {
    vote: voteById(id: $voteId) {
      id
      title
      description
      totalVotes: totalCount

      choices {
        id
        count
        title
      }
    }
  }
`;

const NEW_CHOICE_SUBSCRIPTION = gql`
  subscription NewChoiceSubscription($voteId: ID!) {
    onNewChoice(voteId: $voteId) {
      id
      totalCount
      choices {
        id
        count
      }
    }
  }
`;

const REGISTER_CHOICE_MUTATION = gql`
  mutation RegisterChoiceMutation($choiceId: ID!) {
    registerChoice(choiceId: $choiceId) {
      id
      totalCount
      choice(choiceId: $choiceId) {
        id
        count
      }
    }
  }
`;

export default function VotePage() {
  const history = useHistory();
  const { voteId } = useParams();
  const { loading, error, data, refetch } = useQuery(SINGLE_VOTE_QUERY, {
    variables: { voteId }
  });

  const [
    registerChoiceMutation,
    { loading: registerChoiceMutationIsRunning }
  ] = useMutation(REGISTER_CHOICE_MUTATION);

  useSubscription(NEW_CHOICE_SUBSCRIPTION, {
    variables: { voteId }
  });

  if (loading) {
    return <VoteLoadingIndicator title={`Loading Vote ${voteId}`} />;
  }

  if (error) {
    console.error("Failed to load GraphQL Data", error);
    return <ErrorMessage msg="Could not load data" onRetry={refetch} />;
  }

  if (!data.vote) {
    return <ErrorMessage msg={`Could not find Vote with '${voteId}'`} />;
  }

  async function registerChoice(choiceId) {
    await registerChoiceMutation({
      variables: { choiceId }
    });

    history.push("/");
  }
  function dismissVote() {
    history.push("/");
  }

  return (
    <VotingComponent
      registerChoiceRunning={registerChoiceMutationIsRunning}
      vote={data.vote}
      onRegisterChoice={registerChoice}
      onDismissVote={dismissVote}
    />
  );
}
