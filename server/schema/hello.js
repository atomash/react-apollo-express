import { gql, addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server-express';

const helloSchema = makeExecutableSchema({
	typeDefs: gql`
		type Query {
			hello: String
		}
	`
});
addMockFunctionsToSchema({ schema: helloSchema });

export default helloSchema;