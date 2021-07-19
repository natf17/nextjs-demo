import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetGlobalStrings from '../shared/queries/GetGlobalStrings';
import Home from '../components/Home'

/* EXPORT COMPONENT */
export default Home;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest(locale, GetGlobalStrings);

  // handle request errors with 404
  if (!data || !data.string) {
    return { notFound: true }
  }
  
  // pass down data into component props
  return {
    props: {
      strings: data.string,
      locale,
      locales
    }
  }
}