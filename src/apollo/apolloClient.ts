// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://li-sparkles-backend-demo.onrender.com/', // Replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });

// export default client;


import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'
// const client1 = new ApolloClient({
//   uri: 'https://li-sparkles-backend-demo.onrender.com/', // Replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  link: createUploadLink({
    uri: "https://li-sparkles-backend-demo.onrender.com/", // Replace with your GraphQL endpoint
    headers: {
      cookie:
        (typeof window === "undefined"
          ?"ctx?.req?.headers.cookie"
          : undefined) || "",
    },
    fetch,
    // fetchOptions: { credentials: "include" }, // Ensure credentials are included
  }),
  cache: new InMemoryCache(),
  // credentials: "include", // Include credentials globally
  headers: {
    cookie:
      (typeof window === "undefined"
        ? "ctx?.req?.headers.cookie"
        : undefined) || "",
  },
});

export default client;