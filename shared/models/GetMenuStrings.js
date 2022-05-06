import { gql } from "@apollo/client";

const query = (locale = "en") => {
  return gql`
    query {
      menuPage(locale: "${locale}") {
        pageTitle
        directory {
          title
          menuItems {
            id 
            isVisible
            label      
            url        
            image {
              url
              width
              height
            }
          }
        }
        events {
          title
          menuItems {
            id 
            isVisible
            label      
            url        
            image {
              url
              width
              height
            }
          }
        }
        about {
          title
          menuItems {
            id 
            isVisible
            label      
            url        
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
};

export default query;
