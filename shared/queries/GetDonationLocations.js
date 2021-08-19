import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
      query {
        donations(locale:"${locale}"){
          id
          name
          location {
            fullname
            level_name
            level_num
          }
          paymentTypesAccepted
          featImg {
            url
            width
            height
          }
        }    
      }  
  `;
} 

export default query;