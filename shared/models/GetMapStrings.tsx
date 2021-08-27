import { gql } from '@apollo/client';

export type MapPageSchema = {
  pageTitle: string,
  tapWidget: {
    instructions?: string,
    br_label?: string,
    water_label?: string,
    firstaid_label?: string,
    donations_label?: string,
  },
  bathroomAmenity: LocationAmenity,
  waterFountainAmenity: LocationAmenity,
  firstAidAmenity: LocationAmenity,
  donationAmenity: LocationAmenity
};

export type LocationAmenity = {
  widgetLabel: string,
  headingLabel: string
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