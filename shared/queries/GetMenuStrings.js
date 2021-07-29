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
              width
              height
            }
          }
          waterFountains {
            image {
              url
              width
              height
            }
          }
          firstAid {
            image {
              url
              width
              height
            }
          }
          donations {
            image {
              url
              width
              height
            }
          }
          viewAll {
            image {
              url
              width
              height
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
              width
              height
            }
          }
          circuitAssemblies {
            image {
              url
              width
              height
            }
          }
          eventInfo {
            image {
              url
              width
              height
            }
          }
          viewAll {
            image {
              url
              width
              height
            }
          }
        }

        
      }
    }  
  `;
} 

export default query;