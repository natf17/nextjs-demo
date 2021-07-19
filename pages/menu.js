import { ApolloClient, InMemoryCache } from '@apollo/client';
import GetMenuStrings from '../shared/queries/GetMenuStrings';
import Menu from './../components/menu';

/* EXPORT COMPONENT */
export default Menu;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {

  // NOTE: All configured UTS locales inside of Next.js match exactly with Strapi's

  const client = new ApolloClient({
    uri: process.env.CMS_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
  });

  
  const { data } = await client.query({
    query: GetMenuStrings(locale)
  });

  
  // handle graphql errors

  return {
    props: {
      strings: data.menuString,
      locale,
      locales
    }
  }
}