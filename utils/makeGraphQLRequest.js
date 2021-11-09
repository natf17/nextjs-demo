import { 
  ApolloClient,
  createHttpLink, 
  InMemoryCache 
} from '@apollo/client';

export default async function makeGraphQLRequest(locale, query) {
  let client;

    // connect to GraphQL server
    // Dev environment - no token necessary
    if (process.env.NODE_ENV === 'development') {
      client = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
          uri: process.env.CMS_GRAPHQL_ENDPOINT,          
        }),      
        cache: new InMemoryCache()
      });  
    }

    // Production - add JWT access token
    else {
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
    

    // initiate request
    // NOTE: All configured UTS locales inside of Next.js match exactly with Strapi's
    const { data } = await client.query({
      query: query(locale)
    });

    return data;
}