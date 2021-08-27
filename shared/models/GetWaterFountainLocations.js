import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
      query {
        waterFountains(locale:"${locale}"){
          id
          name
          isWheelchairAccessible
          note
          location {
            fullname
            level_name
            level_num
          }    
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