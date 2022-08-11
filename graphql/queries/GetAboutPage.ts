import { gql } from "@apollo/client";

export type AboutPageSchema = {
  pageTitle: string;
  richDescription: string;
};

const GET_ABOUT_PAGE = gql`
  query AboutPage($locale: String!) {
    aboutPage(locale: $locale) {
      pageTitle
      richDescription
    }
  }
`;

export { GET_ABOUT_PAGE };
