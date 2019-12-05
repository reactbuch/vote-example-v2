/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewChoiceSubscription
// ====================================================

export interface NewChoiceSubscription_onNewChoice_choices {
  __typename: "Choice";
  id: string;
  count: number;
}

export interface NewChoiceSubscription_onNewChoice {
  __typename: "Vote";
  id: string;
  /**
   * Sum of all votes that have been made for all choices
   */
  totalCount: number;
  /**
   * All choices of this vote
   */
  choices: NewChoiceSubscription_onNewChoice_choices[];
}

export interface NewChoiceSubscription {
  onNewChoice: NewChoiceSubscription_onNewChoice;
}

export interface NewChoiceSubscriptionVariables {
  voteId: string;
}
