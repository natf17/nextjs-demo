import { gql } from '@apollo/client';

export type Error404PageSchema = {
  pageTitle: string,
  errorDescription: string,
  showRedirectLink: boolean,
  redirectLink?: {
    url: string,
    displayText: string,
    description?: string
  }
}

const query = (locale = "en") => {
  return gql`
    query {
      error404Page(locale: "${locale}") {        
        pageTitle        
        errorDescription
        showRedirectLink
        redirectLink {
          url
          displayText
          description
        }
      }
    }
  `;
} 

export default query;