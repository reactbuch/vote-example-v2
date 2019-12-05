module.exports = `
type Choice {
  id: ID!
  count: Int!

  """Human readable title of this Choice"""
  title: String!
}

"""A Vote is the central domain object in our application.

It consists of one or more **Choices** the user can vote for
"""
type Vote {
  id: ID!
  """The readable title of this Vote"""
  title: String!

  """A meaningful description"""
  description: String!

  """Sum of all votes that have been made for all choices"""
  totalCount: Int!

  """All choices of this vote"""
  choices: [Choice!]!

  """Return the specified Choice or null if not found"""
  choice(choiceId: ID!): Choice
}

type Query {
  ping(msg: String): String!
  votes: [Vote!]!
  voteById(id: ID!): Vote
}


input NewVote {
  title: String!
  description: String!
  choices: [String!]!
}

# Mit Mutations können Daten auf dem Server
# verändert werden
type Mutation {
  addVote(newVote: NewVote!): Vote!
  registerChoice(choiceId: ID!): Vote!
}

type Subscription {
  onNewChoice(voteId: ID): Vote!
}
`;
