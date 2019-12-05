/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NewVote } from "./../../global-query-types";

// ====================================================
// GraphQL mutation operation: AddVoteMutation
// ====================================================

export interface AddVoteMutation_storedVote {
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
  totalCount: number;
}

export interface AddVoteMutation {
  storedVote: AddVoteMutation_storedVote;
}

export interface AddVoteMutationVariables {
  newVote: NewVote;
}
