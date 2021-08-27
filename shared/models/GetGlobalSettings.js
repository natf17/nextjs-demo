import { gql } from '@apollo/client';

const query = (locale = "en") => {
  return gql`
    query {
      globalSetting(locale: "${locale}") { 
        kioskTitle
        venueName
        locale
        localizations {
          id
          locale
        }
      }
    }
  `;
} 

export default query;