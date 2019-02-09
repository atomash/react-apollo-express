import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error';
import { split } from 'apollo-link';
import './index.css';

import App from './app/App';


const isDev = process.env.NODE_ENV === 'development';
const root = document.getElementById('root');


const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const httpLink = new HttpLink({
	uri: 'http://localhost:3000/graphql',
	// credentials: 'same-origin'
})

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:3000/subscriptions',
	options: {
		reconnect: true
	},
})

const link = split(
	({ query }) => {
	  const { kind, operation } = getMainDefinition(query);
	  return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLink,
	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
				),
			);
		if (networkError) console.log(`[Network error]: ${networkError}`);
	}),
);

const client = new ApolloClient({
	connectToDevTools: isDev,
	cache,
	link
});

const renderApp = Component => (
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Component />
		</BrowserRouter>
	</ApolloProvider>
)


hydrate(renderApp(App), root);

if (isDev && module.hot) {
	module.hot.accept('./app/App.js', () => {
		const NextApp = require('./app/App.js').default;
		hydrate(renderApp(NextApp), root);
	});
}
