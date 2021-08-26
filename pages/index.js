import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetGlobalStrings from '../shared/queries/GetGlobalSettings';
import Home from '../components/Home'

/* EXPORT COMPONENT */
export default Home;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest(locale, GetGlobalStrings);

  // handle request errors with 404
  if (!data || !data.globalSetting) {
    return { notFound: true }
  }

  // handle Apollo errors (look into documentation) and
  // separate into utility func for all pages with data fetching
  
  // pass down data into component props
  return {
    props: {
      strings: data.globalSetting,
      locale
    }
  }
}