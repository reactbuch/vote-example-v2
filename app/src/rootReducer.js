import { combineReducers } from "redux";

import apiReducer from "./api/reducer";

import { loginReducer } from "./pages/LoginPage";
import { votesReducer } from "./pages/VoteListPage";

const rootReducer = combineReducers({
  login: loginReducer,
  votes: votesReducer,
  api: apiReducer
});

export default rootReducer;
