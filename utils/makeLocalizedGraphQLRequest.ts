import { DocumentNode } from "@apollo/client";
import getNewApolloClient from "./getNewApolloClient";

export type LocalizedQuery = {
  locale: string;
  query: DocumentNode;
  variables?: {
    [index: string]: string | number;
  };
};

export default async function makeLocalizedGraphQLRequest({
  locale,
  query,
  variables,
}: LocalizedQuery) {
  // create a new Apollo client for each request to avoid stale cached data from previous requests
  let client = getNewApolloClient();

  // NOTE: All configured UTS locales inside of Next.js match exactly with Strapi's
  const { data } = await client.query({
    query: query,
    variables: {
      locale: locale,
      ...variables,
    },
  });

  return data;
}

/* ***
APOLLO CONFIGURATION
https://www.apollographql.com/docs/react/performance/server-side-rendering/#initializing-apollo-client
https://www.apollographql.com/docs/react/networking/authentication/#header
* ***/
