import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
    query {
      menuString(locale: "${locale}") {
        pageTitle,
        mapTitle,
        eventsTitle,
        Map {
          bathrooms
          waterFountains
          firstAid
          donations
          viewMapDirectory
        },
        Events {
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