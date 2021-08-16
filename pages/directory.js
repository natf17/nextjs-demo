import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetMapStrings from '../shared/queries/GetMapStrings';
import Directory from '../components/Directory';

/* EXPORT COMPONENT */
export default Directory;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest(locale, GetMapStrings);

  // handle request errors with 404
  if (!data) {
    return { notFound: true }
  }

  // pass down data into component props
  return {
    props: {
      strings: data.mapPage,
      locale,
      locales
    }
  }
}