import { gql } from '@apollo/client';

export type StringData = {
  kioskTitle: string,
  venueName: string,
  locale: string,
  localizations?: {
    id: string | number,
    locale: string
  }
}

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