const {
  ApolloServer,
  ApolloError,
  PubSub,
  withFilter
} = require("apollo-server");
const typeDefs = require("./schema");
const database = require("./db/InMemoryVoteDatabase");

const slowDown = process.argv[2] && process.argv[2] === "slowMode";

const pubsub = new PubSub();

const resolvers = {
  Query: {
    ping: (_, { msg }) => `Hello, ${msg || "World"}`,
    votes: () => database.getAllVotes(),
    voteById: (_, { id }) => database.getVoteById(id)
  },
  Vote: {
    totalCount: vote =>
      vote.choices.reduce((prev, curr) => prev + curr.count, 0),
    choice: (vote, { choiceId }) => vote.choices.find(c => c.id === choiceId)
  },

  Mutation: {
    registerChoice: (_, { choiceId }, { pubsub }) => {
      const vote = database.getVoteForChoice(choiceId);
      if (!vote) {
        throw new ApolloError(`No choice found with id '${choiceId}'`);
      }

      const choice = vote.choices.find(c => c.id === choiceId);
      choice.count = choice.count + 1;

      const storedVote = database.store(vote);
      pubsub.publish("RegisterChoiceEvent", { vote: storedVote });
      return storedVote;
    },

    addVote: (_, { newVote }) => {
      return database.addVote(newVote);
    }
  },

  Subscription: {
    onNewChoice: {
      resolve: payload => payload.vote,
      subscribe: withFilter(
        (_s, _a, { pubsub }) => pubsub.asyncIterator("RegisterChoiceEvent"),
        (payload, variables) => {
          return variables.voteId ? variables.voteId === payload.vote.id : true;
        }
      )
    }
  }
};

const server = new ApolloServer({
  typeDefs,

  resolvers,

  context: (_req, con) =>
    slowDown && !con
      ? new Promise(res => {
          setTimeout(() => res({ pubsub }), 2000);
        })
      : { pubsub },

  formatError: err => {
    console.error(err.originalError || err);
    return err;
  },

  playground: {
    // Playground runs at http://localhost:4000
    settings: {
      "editor.theme": "light",
      "schema.polling.enable": false
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`  Server ready at ${url}`);
});
