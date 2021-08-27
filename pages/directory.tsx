import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetMapStrings from '../shared/models/GetMapStrings';
import GetDonationLocations from '../shared/models/GetDonationLocations';
import GetBathroomLocations from '../shared/models/GetBathroomLocations';
import GetWaterFountainLocations from '../shared/models/GetWaterFountainLocations';
import GetFirstAidLocations from '../shared/models/GetFirstAidLocations';
import Directory from '../components/Directory';

// type data
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';



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

  // TODO: require ALL requests to resolve, else return error page

  // TEST: build composite amenity object with merged data
  const testCompositeAmenities = {
    bathrooms: {
      id: 'bathrooms',
      ...data.mapPage.bathroomAmenity,
      locations: [...bathroomLocations.bathrooms],
    },
    waterFountains: {
      id: 'waterFountains',
      ...data.mapPage.waterFountainAmenity,
      locations: [...waterFtnLocations.waterFountains],
    },
    firstAid: {
      id: 'firstAid',
      ...data.mapPage.firstAidAmenity,
      locations: [...firstAidLocations.firstAids],
    },
    donations: {
      id: 'donations',
      ...data.mapPage.donationAmenity,
      locations: [...donationLocations.donations],
    }
  }


  // pass down data into component props
  return {
    props: {
      strings: data.mapPage,
      amenityData: testCompositeAmenities,
      bathroomLocations: bathroomLocations.bathrooms,
      waterFtnLocations: waterFtnLocations.waterFountains,
      firstAidLocations: firstAidLocations.firstAids,
      donationLocations: donationLocations.donations,
      locale,
      locales
    }
  }
}



/* EXPORT COMPONENT */
export default Directory;