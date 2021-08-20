import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetMapStrings from '../shared/queries/GetMapStrings';
import GetDonationLocations from '../shared/queries/GetDonationLocations';
import GetBathroomLocations from '../shared/queries/GetBathroomLocations';
import GetWaterFountainLocations from '../shared/queries/GetWaterFountainLocations';
import GetFirstAidLocations from '../shared/queries/GetFirstAidLocations';
import Directory from '../components/Directory';

/* EXPORT COMPONENT */
export default Directory;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest(locale, GetMapStrings);

  // make requests for amenities locations
  const bathroomLocations = await makeGraphQLRequest(locale, GetBathroomLocations);
  const waterFtnLocations = await makeGraphQLRequest(locale, GetWaterFountainLocations);
  const firstAidLocations = await makeGraphQLRequest(locale, GetFirstAidLocations);
  const donationLocations = await makeGraphQLRequest(locale, GetDonationLocations);


  // handle request errors with 404
  if (!data || !data.mapPage) {
    return { notFound: true }
  }

  // pass down data into component props
  return {
    props: {
      strings: data.mapPage,
      bathroomLocations: bathroomLocations.bathrooms,
      waterFtnLocations: waterFtnLocations.waterFountains,
      firstAidLocations: firstAidLocations.firstAids,
      donationLocations: donationLocations.donations,
      locale,
      locales
    }
  }
}