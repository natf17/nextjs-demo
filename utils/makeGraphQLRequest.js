import { ApolloClient, InMemoryCache } from '@apollo/client';

export default async function makeGraphQLRequest(locale, query) {

    // connect to GraphQL server
    const client = new ApolloClient({
      uri: process.env.CMS_GRAPHQL_ENDPOINT,
      cache: new InMemoryCache()
    });

    // initiate request
    // NOTE: All configured UTS locales inside of Next.js match exactly with Strapi's
    const { data } = await client.query({
      query: query(locale)
    });

    return data;
}