import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';
import { getPropellerApiUrl, getPropellerKey } from '../src/configuration';

const link = new HttpLink({
  uri: getPropellerApiUrl(),
  fetch,
  headers: {
    apiKey: getPropellerKey(),
  },
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

export { client };
