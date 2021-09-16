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
import { MapImage } from '../shared/models/GetMapStrings';

// ID used to programatically identify each amenity
export type AmenityId = 'bathrooms' | 'firstAid' | 'donations' | 'waterFountains';


// Composite data we will be constructing from above types
export type AmenityData = {
  bathrooms: LocationAmenity & {
    id: AmenityId,
    locations?: BathroomLocationSchema[],
    mapImage: MapImage
  },
  waterFountains: LocationAmenity & {
    id: AmenityId,
    locations?: WaterFountainSchema[],
    mapImage: MapImage
  },
  firstAid: LocationAmenity & {
    id: AmenityId,
    locations?: FirstAidSchema[],
    mapImage: MapImage
  },
  donations: LocationAmenity & {
    id: AmenityId,
    locations?: DonationLocationSchema[],
    mapImage: MapImage
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
            locations: [...bathroomLocations.bathrooms],
            mapImage: mapPage.maps.bathrooms
          },
          waterFountains: {
            id: 'waterFountains',
            ...mapPage.waterFountainAmenity,
            locations: [...waterFtnLocations.waterFountains],
            mapImage: mapPage.maps.waterFountains
          },
          firstAid: {
            id: 'firstAid',
            ...mapPage.firstAidAmenity,
            locations: [...firstAidLocations.firstAids],
            mapImage: mapPage.maps.firstAid
          },
          donations: {
            id: 'donations',
            ...mapPage.donationAmenity,
            locations: [...donationLocations.donations],
            mapImage: mapPage.maps.donations          
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




/* EXPORT COMPONENT */
export default Directory;