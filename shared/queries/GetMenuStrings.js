import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
    query {
      menuString(locale: "${locale}") {
        Map {
          XX_fieldName
          bathrooms
          waterFountains
          firstAid
          donations
          viewMapDirectory
        },
        Events {
          XX_fieldName
          regConventions
          circuitAssemblies
          eventHelp
          seeEventSchedule
        }
      }
    }  
  `;
} 

export default query;