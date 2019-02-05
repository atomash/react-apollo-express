import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { HttpLink } from 'apollo-link-http';

import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import './index.css';


import App from './app/App';


const isDev = process.env.NODE_ENV === 'development';
const root = document.getElementById('root')

const client = new ApolloClient({
	connectToDevTools: isDev,
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
					),
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		new HttpLink({
			uri: 'http://localhost:3000/graphql',
			// credentials: 'same-origin'
		})
	]),
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
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
