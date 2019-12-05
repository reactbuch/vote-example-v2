const intialApiState = {
  loading: false,
  description: null,
  error: null
};

export default function apiReducer(state = intialApiState, action) {
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
