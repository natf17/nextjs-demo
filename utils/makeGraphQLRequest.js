import { 
  ApolloClient,
  createHttpLink, 
  InMemoryCache 
} from '@apollo/client';

export default async function makeGraphQLRequest(locale, query) {
  let client;

    // connect to GraphQL server
    // If token is necessary, include it
    if (process.env.NODE_ENV === 'production' && process.env.CMS_ACCESS_TOKEN) {
      client = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
          uri: process.env.CMS_GRAPHQL_ENDPOINT,
          headers: {
            authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`
          }
        }),      
        cache: new InMemoryCache()
      });        
    }

    // No token needed
    else {
      client = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
          uri: process.env.CMS_GRAPHQL_ENDPOINT,          
        }),      
        cache: new InMemoryCache()
      });
    }
    

    // initiate request
    // NOTE: All configured UTS locales inside of Next.js match exactly with Strapi's
    const { data } = await client.query({
      query: query(locale)
    });

    return data;
}


/* ***
APOLLO CONFIGURATION
https://www.apollographql.com/docs/react/performance/server-side-rendering/#initializing-apollo-client
https://www.apollographql.com/docs/react/networking/authentication/#header
* ***/
