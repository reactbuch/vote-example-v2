/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VoteListQuery
// ====================================================

export interface VoteListQuery_allVotes {
  __typename: "Vote";
  id: string;
  /**
   * The readable title of this Vote
   */
  title: string;
  /**
   * A meaningful description
   */
  description: string;
  /**
   * Sum of all votes that have been made for all choices
   */
  totalVotes: number;
}

export interface VoteListQuery {
  allVotes: VoteListQuery_allVotes[];
}
