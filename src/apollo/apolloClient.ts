import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://li-sparkles-backend-demo.onrender.com/', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
