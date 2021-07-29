import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetMenuStrings from '../shared/queries/GetMenuStrings';
import Menu from '../components/Menu';

/* EXPORT COMPONENT */
export default Menu;


/* PAGE CONFIG */
const DIRECTORY_MENU_INDEXES = ['bathrooms', 'waterFountains', 'donations', 'firstAid', 'viewAll'];
const EVENTS_MENU_INDEXES = ['regConventions', 'circuitAssemblies', 'eventInfo', 'viewAll'];


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest(locale, GetMenuStrings);

  // handle request errors with 404
  if (!data || !data.menuPage) {
    return { notFound: true }
  }

  // pass down data into component props
  return {
    props: {
      strings: data.menuPage,
      directoryIndexes: DIRECTORY_MENU_INDEXES,
      eventsIndexes: EVENTS_MENU_INDEXES,
      locale,
      locales
    }
  }
}