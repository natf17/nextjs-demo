import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
    query {
      mapPage(locale: "${locale}") {
        pageTitle
      }
    }  
  `;
} 

export default query;