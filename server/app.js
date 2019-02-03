import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

import render from './render';

const app = express();
const isDev = process.env.NODE_ENV === 'development';

  
const Apollo = new ApolloServer({
	playground: isDev,
	typeDefs,
	resolvers
});

export const gg = async(f) => {
	await f(app)
}
app.use(compression());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.static('build/client/'));

	app.use(morgan('dev'));
	app.use(cookieParser());
	Apollo.applyMiddleware({ app, path: '/graphql' });
	app.use(render);


export default app