import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ApolloServer, mergeSchemas } from 'apollo-server-express';
// import { mergeSchemas } from "graphql-tools";
import express from 'express';
import schemas from './schema';
import resolvers from './resolvers';
import render from './render';

const app = express();

const isDev = process.env.NODE_ENV === 'development';


const schema = mergeSchemas({
	schemas,
	resolvers
});

  
const Apollo = new ApolloServer({
	playground: isDev,
	schema
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('build/client/'));
app.use(morgan('dev'));
app.use(cookieParser());
Apollo.applyMiddleware({ app, path: '/graphql' });

if (isDev) {
	const proxy = require('http-proxy-middleware');
	app.use('/__webpack_hmr', proxy('ws://localhost:3001/', { changeOrigin: true }));
}

app.use(render);

export default app
 