/** A Choice object as received from server */
export type Choice = {
  title: string;
  count: number;
  id: string;
};

export type VoteData = {
  id: string;
  title: string;
  description: string;
  totalVotes: number;
};

export type Vote = VoteData & {
  choices: Choice[];
};
