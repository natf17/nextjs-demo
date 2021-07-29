import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
    query {
      menuPage(locale: "${locale}") {
        pageTitle
        directory {
          title 
          bathrooms {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          waterFountains {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          firstAid {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          donations {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          viewAll {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
        }
        
        events {
          title
          regConventions {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          circuitAssemblies {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          eventInfo {
            isVisible
            label
            image {
              url
              width
              height
            }
          }
          viewAll {
            isVisible
            label
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