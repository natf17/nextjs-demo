import { DocumentNode, gql } from "@apollo/client";

export type HomePageSchema = {
  id: string;
  pageTitle: string;
  tapToContinuePrompt: string;
  welcomeText: string;
};

export type MultiLangHomePage = {
  [key: string]: HomePageSchema;
};

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

/* Query builder for requesting each configured locale in single query */
const getMultiLangQuery = (locales: string[]): DocumentNode => {
  let multiLangQuery = "";
  locales.forEach((locale) => {
    multiLangQuery += `
      ${locale}: homePage(locale: "${locale}") {
        ...homePageFields
      }
    `;
  });

  return gql`
    fragment homePageFields on HomePage {
      id
      pageTitle
      tapToContinuePrompt
      welcomeText
    }
    
    query MultiLangQuery {
      ${multiLangQuery}
    }
  `;
};

export { getMultiLangQuery };
export default query;
