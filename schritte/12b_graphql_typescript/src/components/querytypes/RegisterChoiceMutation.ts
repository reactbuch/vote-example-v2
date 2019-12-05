/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterChoiceMutation
// ====================================================

export interface RegisterChoiceMutation_registerChoice_choice {
  __typename: "Choice";
  id: string;
  count: number;
}

export interface RegisterChoiceMutation_registerChoice {
  __typename: "Vote";
  id: string;
  /**
   * Sum of all votes that have been made for all choices
   */
  totalCount: number;
  /**
   * Return the specified Choice or null if not found
   */
  choice: RegisterChoiceMutation_registerChoice_choice | null;
}

export interface RegisterChoiceMutation {
  registerChoice: RegisterChoiceMutation_registerChoice;
}

export interface RegisterChoiceMutationVariables {
  choiceId: string;
}
