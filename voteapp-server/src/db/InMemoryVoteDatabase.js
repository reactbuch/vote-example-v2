let data = require("./SampleVotes");
let counter = 0;

function generateNewId() {
  counter++;
  return "v_" + counter;
}

/** Copies the given vote if defined
 * The 'InMemoryVoteDatabase' should only return copies of objects to prevent access to it's internal store
 */
function copyVote(vote) {
  return vote ? { ...vote } : vote;
}

const InMemoryVoteDatabase = {
  /** Returns all stored votes as second parameter to the given callback */
  getAllVotes(callback) {
    // return a copy of data as this is same behaviour as when using 'real' database
    callback(null, data.map(v => copyVote(v)));
  },

  /** returns the requested vote as callbacks second arg */
  getVoteById(id, callback) {
    callback(null, copyVote(data.find(v => v.id === id)));
  },

  /** Stores the given vote. Returns stored vote as callbacks second arg */
  store(vote, callback) {
    if (!vote.id) {
      vote.id = generateNewId();
      data.push(vote);
    } else {
      data = data.map(v => (v.id === vote.id ? vote : v));
    }
    callback(null, copyVote(vote));
  }
};

module.exports = {
  create(callback) {
    console.log("Using InMemoryDatabase");
    return callback(null, InMemoryVoteDatabase);
  }
};
