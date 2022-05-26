import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export default function getNewApolloClient() {
  let client;

  // connect to GraphQL server
  // If token is necessary, include it
  if (process.env.NODE_ENV === "production" && process.env.CMS_ACCESS_TOKEN) {
    client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: process.env.CMS_GRAPHQL_ENDPOINT,
        headers: {
          authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`,
        },
      }),
      cache: new InMemoryCache(),
    });
  }

  // No token needed
  else {
    client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: process.env.CMS_GRAPHQL_ENDPOINT,
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
}
