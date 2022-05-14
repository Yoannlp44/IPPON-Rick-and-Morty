import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { HttpLink } from '@apollo/client/link/http';
import { InMemoryCache, ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Navigation from './src/navigation/Navigation';
import Config from './config';

const link = new HttpLink({
  uri: Config.graphqlUrl.url,
});

const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
  if (response) {
    console.log(`[Response]: ${response}`);
  }
  if (operation) {
    console.log(`[Operation]: ${operation}`);
  }
});

const localCache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache: localCache,
  assumeImmutableResults: true,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(Config.appName, () => App);

export default App;