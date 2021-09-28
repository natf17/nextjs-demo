import { gql } from '@apollo/client';


export type HomePageSchema = {
  id: string,
  pageTitle: string,
  tapToContinuePrompt: string,
  welcomeText: string
}

const query = (locale = "en") => {
  return gql`
      query {
        homePage(locale:"${locale}"){
          id
          pageTitle
          tapToContinuePrompt
          welcomeText          
        }    
      }  
  `;
};

export default query;