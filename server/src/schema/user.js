export const schema = `

type User {
  id: String
  username: String
}

extend type Query {
  currentUser: User
}


`

export const resolvers = {
  Query: {
    currentUser: (root, _, {user}) => {
      return user;
    }
  }
}