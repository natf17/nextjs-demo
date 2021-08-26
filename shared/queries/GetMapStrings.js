import { gql } from '@apollo/client';

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