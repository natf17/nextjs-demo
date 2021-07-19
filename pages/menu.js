// import { ApolloClient, InMemoryCache } from '@apollo/client';
import GetMenuStrings from '../shared/queries/GetMenuStrings';
import Menu from '../components/Menu';
import makeGraphQLRequest from '../utils/makeGraphQLRequest';

/* EXPORT COMPONENT */
export default Menu;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest("locale", GetMenuStrings);

  // handle request errors with 404
  if (!data || !data.strings) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      strings: data.menuString,
      locale,
      locales
    }
  }
}