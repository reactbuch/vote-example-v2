import { combineReducers } from "redux";

const INITIAL_GREETING_STATE = "World";
function greetingReducer(state = INITIAL_GREETING_STATE, action) {
  switch (action.type) {
    case "UPDATE_GREETING":
      return action.greeting;
    case "RESET_GREETING":
      return INITIAL_GREETING_STATE;
    default:
      return state;
  }
}

export default combineReducers({
  greeting: greetingReducer
});
