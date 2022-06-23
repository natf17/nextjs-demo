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
  mapViewConfig: MapViewConfig;
  bathroomAmenity: LocationAmenity;
  waterFountainAmenity: LocationAmenity;
  firstAidAmenity: LocationAmenity;
  donationAmenity: LocationAmenity;
  maps: MapImages;
};

export type MapViewConfig = {
  enableFsCustomMaps: boolean;
  clearResults: string;
  levelSelect: string;
  mapNotAvailable: string;
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
  map: {
    width: number;
    height: number;
    url: string;
  };
};

const query = (locale = "en") => {
  return gql`
    query {
      mapPage(locale: "${locale}") {
        pageTitle
        pageDescription
        tapWidget {
          instructions
          br_label
          water_label
          firstaid_label
          donations_label
        }
        mapViewConfig {
          enableFsCustomMaps
          clearResults
          levelSelect
          mapNotAvailable
        }
        bathroomAmenity {
          widgetLabel
          headingLabel
        }
        waterFountainAmenity {
          widgetLabel
          headingLabel
        }
        firstAidAmenity {
          widgetLabel
          headingLabel
        }
        donationAmenity {
          widgetLabel
          headingLabel
        }
        maps {
          default {
            width
            height
            url
          }
          bathrooms {
            width
            height
            url
          }
          waterFountains {
            width
            height
            url
          }
          firstAid {
            width
            height
            url
          }
          donations {
            width
            height
            url
          }
        }
      }
      locations(locale:"${locale}", sort:"level_num:asc"){
        id
        fullname
        level_num
        level_name
        map {          
          width
          height
          url
        }
      }
    }  
  `;
};

export default query;
