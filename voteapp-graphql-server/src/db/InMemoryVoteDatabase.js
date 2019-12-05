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
  getAllVotes() {
    return data.map(v => copyVote(v));
  },

  getVoteById(id) {
    return copyVote(data.find(v => v.id === id));
  },

  getVoteForChoice(choiceId) {
    return data.find(v => {
      return v.choices.find(c => c.id === choiceId) !== undefined;
    });
  },

  addVote(newVoteData) {
    const newVoteId = generateNewId();
    const newVote = {
      id: newVoteId,
      title: newVoteData.title,
      description: newVoteData.description,
      choices: newVoteData.choices.map((c, ix) => ({
        id: `${newVoteId}_choice_${ix}`,
        count: 0,
        title: c
      }))
    };

    data.push(newVote);
    return newVote;
  },

  store(vote) {
    if (!vote.id) {
      console.error("No ID in Vote object", vote);
      throw new Error("No id in vote " + vote);
    } else {
      data = data.map(v => (v.id === vote.id ? vote : v));
    }
    return copyVote(vote);
  }
};

module.exports = InMemoryVoteDatabase;
