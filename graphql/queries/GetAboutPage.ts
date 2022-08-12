import { gql } from "@apollo/client";

export type AboutPageSchema = {
  pageTitle: string;
  richDescription: string;
  featImg: {
    url: string;
    width: number;
    height: number;
    alternativeText: string;
  };
};

const GET_ABOUT_PAGE = gql`
  query AboutPage($locale: String!) {
    aboutPage(locale: $locale) {
      pageTitle
      richDescription
      featImg {
        url
        width
        height
        alternativeText
      }
    }
  }
`;

export { GET_ABOUT_PAGE };
