const typeDefinitions = `
  type User {
      id: ID!
      name: String!
      email: String!
      token: String!
  }
  type Query {
    login(email: String!, password: String!): User
    logout(email: String!, token: String!): Int
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User
  }
`

export default typeDefinitions;