/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SingleVoteQuery
// ====================================================

export interface SingleVoteQuery_vote_choices {
  __typename: "Choice";
  id: string;
  count: number;
  /**
   * Human readable title of this Choice
   */
  title: string;
}

export interface SingleVoteQuery_vote {
  __typename: "Vote";
  id: string;
  /**
   * The readable title of this Vote
   */
  title: string;
  /**
   * Sum of all votes that have been made for all choices
   */
  totalVotes: number;
  /**
   * A meaningful description
   */
  description: string;
  /**
   * All choices of this vote
   */
  choices: SingleVoteQuery_vote_choices[];
}

export interface SingleVoteQuery {
  vote: SingleVoteQuery_vote | null;
}

export interface SingleVoteQueryVariables {
  voteId: string;
}
