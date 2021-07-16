import { ApolloClient, InMemoryCache } from '@apollo/client';
import GetGlobalStrings from '../shared/queries/GetGlobalStrings';
import Home from './../components/index'

/* EXPORT COMPONENT */
export default Home;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {

  // NOTE: All configured UTS locales inside of Next.js match exactly with Strapi's

  const client = new ApolloClient({
    uri: process.env.CMS_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
  });

  
  const { data } = await client.query({
    query: GetGlobalStrings(locale)
  });


  // handle graphql errors

  return {
    props: {
      strings: data.string,
      locale,
      locales
    }
  }
}