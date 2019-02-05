import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fetch from 'node-fetch';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import AppRouter from '../src/app/App';

import assets from '../build/client/asset-manifest.json';

export default async (req, res, next) => {
  const client = new ApolloClient({
   ssrMode: true,
   link: createHttpLink({
     uri: 'http://localhost:3000/graphql',
     headers: {
       cookie: req.header('Cookie'),
     },
     fetch,
   }),
   cache: new InMemoryCache(),
 });

  const context = {};
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <AppRouter />
      </StaticRouter>
    </ApolloProvider>
  );

    await getDataFromTree(App)
    const html = ReactDOMServer.renderToString(App);
  const initialState = client.extract();
  const paths = [];
  const jsScripts = bundles => {
    for (const key in bundles) {
      if (key.endsWith('.js')) {
          paths.push(bundles[key])
        }
      }
      return paths.reduce((string, path) => {
        string += `<script type="text/javascript" src=${path}></script>`;
        return string;
      }, '');
  };
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Apollo</title>
          <link rel="stylesheet" href=${assets['main.css']}>
        </head>
        <body>
          <script>
            window.__APOLLO_STATE__ = ${JSON.stringify(initialState, null, 2).replace(/</g, '\\u003c')};
          </script>
          <div id="root">${html}</div>
          ${jsScripts(assets)}
        </body>
      </html>
    `);
}