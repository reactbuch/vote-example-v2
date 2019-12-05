export default function votesReducer(state = [], action) {
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
