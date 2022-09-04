import makeLocalizedGraphQLRequest from "../utils/makeLocalizedGraphQLRequest";
import { GET_ABOUT_PAGE } from "../graphql/queries/GetAboutPage";
import About from "../components/About";

// Type data
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

// API Schema
import { AboutPageSchema } from "../graphql/queries/GetAboutPage";

// Page component props
export type Props = {
  strings: AboutPageSchema;
  locale: string;
};

// Next 'context' params
interface Params extends ParsedUrlQuery {
  locale: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const locale = context.locale!;

  try {
    const { aboutPage } = await makeLocalizedGraphQLRequest({
      locale: locale,
      query: GET_ABOUT_PAGE,
    });
    return {
      props: {
        strings: aboutPage,
        locale,
      },
    };
  } catch (error) {
    console.log(`ERROR: ${error}`);
    // if any errors, return 404
    return {
      notFound: true,
    };
  }
};

/* EXPORT COMPONENT */
export default About;
