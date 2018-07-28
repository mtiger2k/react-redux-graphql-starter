import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
//import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client'

 import config from './config'

const PORT = config.api_port;

export default () => {

  // start apollo client
  function dataIdFromObject(result) {
    if (result.__typename) {
      if (result.id !== undefined) {
        return `${result.__typename}:${result.id}`;
      }
    }
    return null;
  }

  const cache = new InMemoryCache({
  //const cache = new ReduxCache({ store,
    dataIdFromObject,
    cacheResolvers: {
      Query: {
        channel: (_, args) => {
          return toIdValue(
            cache.config.dataIdFromObject({
              __typename: 'LoanRequest',
              id: args.id
            })
          );
        }
      }
    }
  });

  const httpLink = createUploadLink({
    uri: `http://localhost:${PORT}/graphql`
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:${PORT}/subscriptions`,
    options: {
      reconnect: true
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth-token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
      }
    }
  });

  const errLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(errLink).concat(link),
    cache
  });

  return client;
}

