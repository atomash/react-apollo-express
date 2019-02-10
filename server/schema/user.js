import { gql, addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server-express';

const userSchema = makeExecutableSchema({
	typeDefs: gql`
		type Subscription {
			userAdded: User
			userDeleted: User
		}
		type Query {
			allUsers: [User]
		}
		type Mutation {
			addUser(name: String!): User
			deleteUser(id: String!): User
			updateUser(id: String!, name: String): User
		}
		type User {
			_id: String
			name: String
		}
	`
});

addMockFunctionsToSchema({ schema: userSchema });

export default userSchema