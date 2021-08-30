import { gql } from '@apollo/client';

// separated types for easy type separation and import from modules
export type BasicPageSchema = {
  pageTitle: string,
  tapWidget: {
    instructions?: string,
    br_label?: string,
    water_label?: string,
    firstaid_label?: string,
    donations_label?: string,
  }
}

export type MapPageSchema = BasicPageSchema & {
  bathroomAmenity: LocationAmenity,
  waterFountainAmenity: LocationAmenity,
  firstAidAmenity: LocationAmenity,
  donationAmenity: LocationAmenity
};


export type LocationAmenity = {
  widgetLabel: string,
  headingLabel: string
}

export type LocationSchema = {
  fullname: string,
  level_name: 'FIRST' | 'MEZZ' | 'SECOND' | 'THIRD',
  level_num: number
}

const query = (locale = "en") => {
  return gql`
    query {
      mapPage(locale: "${locale}") {
        pageTitle
        tapWidget {
          instructions
          br_label
          water_label
          firstaid_label
          donations_label
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
      }
    }  
  `;
} 

export default query;