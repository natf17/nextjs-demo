import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
    query {
      menuPage(locale: "${locale}") {
        pageTitle
        directorySection {
          title
          bathrooms {
            label
            isHidden
          }
          waterFountains {
            label
            isHidden
          }
          firstAid {
            label
            isHidden        
          }
          donations {
            label
            isHidden
          }
          viewAll {
            label
            isHidden
          }
        }
        
        directoryImages {
          bathrooms {
            image {
              url
            }
          }
          waterFountains {
            image {
              url
            }
          }
          firstAid {
            image {
              url
            }
          }
          donations {
            image {
              url
            }
          }
          viewAll {
            image {
              url
            }
          }
        }
        
        eventsSection {
          title
          regConventions {
            label
            isHidden
          }
          circuitAssemblies {
            label
            isHidden
          }
          eventInfo {
            label
            isHidden        
          }
          viewAll {
            label
            isHidden
          }
        }
        
        
        eventsImages {
          regConventions {
            image {
              url
            }
          }
          circuitAssemblies {
            image {
              url
            }
          }
          eventInfo {
            image {
              url
            }
          }
          viewAll {
            image {
              url
            }
          }
        }

        
      }
    }  
  `;
} 

export default query;