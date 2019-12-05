/** A Choice object as received from server */
export type Choice = {
  title: string;
  count: number;
  id: string;
};

/** A Vote object as received from server */
export type Vote = {
  id: string;
  title: string;
  description: string;

  choices: Choice[];
};

/** A vote that has been created by the user but has not been sent to server yet */
export type UnsavedVote = {
  title: string;
  description: string;

  choices: { title: string }[];
};

export type Notification = {
  message: string;
  level: "error" | "info";
};

export type TODO = any; // 😱😈😳🤐
