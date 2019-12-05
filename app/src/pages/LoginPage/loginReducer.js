export default function loginReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.username;
    default:
      return state;
  }
}
