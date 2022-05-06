import { gql } from "@apollo/client";

// separated types for easy type separation and import from modules
export type BasicPageSchema = {
  pageTitle: string;
  pageDescription: string;
  tapWidget: {
    instructions?: string;
    br_label?: string;
    water_label?: string;
    firstaid_label?: string;
    donations_label?: string;
  };
};

export type MapPageSchema = BasicPageSchema & {
  bathroomAmenity: LocationAmenity;
  waterFountainAmenity: LocationAmenity;
  firstAidAmenity: LocationAmenity;
  donationAmenity: LocationAmenity;
  maps: MapImages;
};

export type LocationAmenity = {
  widgetLabel: string;
  headingLabel: string;
};

export type MapImages = {
  default: MapImage;
  bathrooms: MapImage;
  waterFountains: MapImage;
  firstAid: MapImage;
  donations: MapImage;
};
export type MapImage = {
  width: number;
  height: number;
  url: string;
};

export type LocationSchema = {
  fullname: string;
  level_name: "FIRST" | "MEZZ" | "SECOND" | "THIRD";
  level_num: number;
};

const query = (locale = "en") => {
  return gql`

    # Declare fragments to reuse repeated fields
    # This can also hold variables which will pass down from the query
    # Also look into using __typename field which returns a string with the 
    # name of the object type in graphql
    fragment imageFields on Maps {
      width
      height
      url
    }
    fragment amenityFields on bathroomAmenity {
      widgetLabel
      headingLabel
    }
    query MapPageStrings($locale: String = "en") {
      mapPage(locale: $locale) {
        pageTitle
        pageDescription
        tapWidget {
          instructions
          br_label
          water_label
          firstaid_label
          donations_label
        }
        
        bathroomAmenity {
          ...amenityFields
        }
        waterFountainAmenity {
          ...amenityFields
        }
        firstAidAmenity {
          ...amenityFields
        }
        donationAmenity {
          ...amenityFields
        }
        maps {
          default {
            ...imageFields
          }
          bathrooms {
            ...imageFields
          }
          waterFountains {
            ...imageFields
          }
          firstAid {
            ...imageFields
          }
          donations {
            ...imageFields
          }
        }
      }
      locations(locale:"${locale}", sort:"level_num:asc"){
        id
        fullname
        level_num
        level_name
      }
    }  
  `;
};

export default query;
