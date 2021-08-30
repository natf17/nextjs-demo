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
import { BasicPageSchema } from '../shared/models/GetMapStrings';
import { LocationAmenity } from '../shared/models/GetMapStrings';
import { DonationLocationSchema } from '../shared/models/GetDonationLocations';
import { BathroomLocationSchema } from '../shared/models/GetBathroomLocations';
import { WaterFountainSchema } from '../shared/models/GetWaterFountainLocations';
import { FirstAidSchema } from '../shared/models/GetFirstAidLocations';


// Composite data we will be constructing from above types
export type AmenityData = {
  bathrooms: LocationAmenity & {
    id: string,
    locations?: BathroomLocationSchema[]
  },
  waterFountains: LocationAmenity & {
    id: string,
    locations?: WaterFountainSchema[]
  },
  firstAid: LocationAmenity & {
    id: string,
    locations?: FirstAidSchema[]
  },
  donations: LocationAmenity & {
    id: string,
    locations?: DonationLocationSchema[]
  }
}


// Props passed down to page component
export type Props = {
  strings: BasicPageSchema,
  amenityData: AmenityData,
  locale: string
}

// Context params interface
export interface Params extends ParsedUrlQuery {
  locale: string
}

// export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
//   const locale = context.locale!;
  
//   try {
//     const { menuPage } = await makeGraphQLRequest(locale, GetMapStrings);
//     return {
//       props: {
//         strings: menuPage,
//         locale
//       }
//     }
//   } catch (error) {
//     // if any errors, return 404
//     return {
//       notFound: true
//     }
//   }
// }

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const locale = context.locale!;
  
  try {
    const { mapPage } = await makeGraphQLRequest(locale, GetMapStrings);
    const bathroomLocations = await makeGraphQLRequest(locale, GetBathroomLocations);
    const waterFtnLocations = await makeGraphQLRequest(locale, GetWaterFountainLocations);
    const firstAidLocations = await makeGraphQLRequest(locale, GetFirstAidLocations);
    const donationLocations = await makeGraphQLRequest(locale, GetDonationLocations);


    return {
      props: {
        strings: mapPage,
        amenityData: {
          bathrooms: {
            id: 'bathrooms',
            ...mapPage.bathroomAmenity,
            locations: [...bathroomLocations.bathrooms]
          },
          waterFountains: {
            id: 'waterFountains',
            ...mapPage.waterFountainAmenity,
            locations: [...waterFtnLocations.waterFountains]
          },
          firstAid: {
            id: 'firstAid',
            ...mapPage.firstAidAmenity,
            locations: [...firstAidLocations.firstAids]
          },
          donations: {
            id: 'donations',
            ...mapPage.donationAmenity,
            locations: [...donationLocations.donations]
          }
        },
        locale
      }
    }
    
  } catch (error) {
    // if any errors, return 404
    return {
      notFound: true
    }
  }
}


/* SERVER SIDE CONFIG */
// export async function getStaticProps({ locale, locales }) {
//   // make request for strings on Strapi
//   const data = await makeGraphQLRequest(locale, GetMapStrings);

//   // make requests for amenities locations
//   const bathroomLocations = await makeGraphQLRequest(locale, GetBathroomLocations);
//   const waterFtnLocations = await makeGraphQLRequest(locale, GetWaterFountainLocations);
//   const firstAidLocations = await makeGraphQLRequest(locale, GetFirstAidLocations);
//   const donationLocations = await makeGraphQLRequest(locale, GetDonationLocations);


//   // handle request errors with 404
//   if (!data || !data.mapPage) {
//     return { notFound: true }
//   }

//   // TODO: require ALL requests to resolve, else return error page

//   // TEST: build composite amenity object with merged data
//   const testCompositeAmenities = {
//     bathrooms: {
//       id: 'bathrooms',
//       ...data.mapPage.bathroomAmenity,
//       locations: [...bathroomLocations.bathrooms],
//     },
//     waterFountains: {
//       id: 'waterFountains',
//       ...data.mapPage.waterFountainAmenity,
//       locations: [...waterFtnLocations.waterFountains],
//     },
//     firstAid: {
//       id: 'firstAid',
//       ...data.mapPage.firstAidAmenity,
//       locations: [...firstAidLocations.firstAids],
//     },
//     donations: {
//       id: 'donations',
//       ...data.mapPage.donationAmenity,
//       locations: [...donationLocations.donations],
//     }
//   }


//   // pass down data into component props
//   return {
//     props: {
//       strings: data.mapPage,
//       amenityData: testCompositeAmenities,
//       bathroomLocations: bathroomLocations.bathrooms,
//       waterFtnLocations: waterFtnLocations.waterFountains,
//       firstAidLocations: firstAidLocations.firstAids,
//       donationLocations: donationLocations.donations,
//       locale,
//       locales
//     }
//   }
// }



/* EXPORT COMPONENT */
export default Directory;