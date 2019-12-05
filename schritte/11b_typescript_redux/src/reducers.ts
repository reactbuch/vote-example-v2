import { combineReducers } from "redux";
import {
  LoginAction,
  ApiRequestFailureAction,
  ApiRequestStartAction,
  ApiRequestSuccessAction,
  SetVotesAction,
  AddVoteAction,
  UpdateVoteAction
} from "./actions";
import { Vote } from "./types";

type LoginState = string | null;

function loginReducer(
  state: LoginState = null,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case "LOGIN":
      return action.username;
    default:
      return state;
  }
}

type ApiState = {
  loading: boolean;
  description: string | null;
  error: string | null;
};

const intialApiState: ApiState = {
  loading: false,
  description: null,
  error: null
};

function apiReducer(
  state: ApiState = intialApiState,
  action:
    | ApiRequestStartAction
    | ApiRequestFailureAction
    | ApiRequestSuccessAction
) {
  switch (action.type) {
    case "API_REQUEST_START":
      return {
        description: action.description,
        loading: true,
        error: null
      };
    case "API_REQUEST_SUCCESS":
      return { ...state, loading: false, error: null };
    case "API_REQUEST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error.toString()
      };
    default:
  }

  return state;
}

export type VotesState = Vote[];

export function votesReducer(
  state: VotesState = [],
  action: SetVotesAction | AddVoteAction | UpdateVoteAction
): VotesState {
  switch (action.type) {
    case "SET_VOTES":
      return action.votes;
    case "ADD_VOTE":
      return [...state, action.newVote];
    case "UPDATE_VOTE":
      const updatedVote = action.vote;
      return state.map(vote => {
        if (vote.id === updatedVote.id) {
          return updatedVote;
        }
        return vote;
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  login: loginReducer,
  votes: votesReducer,
  api: apiReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
