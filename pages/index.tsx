import makeGraphQLRequest from "../utils/makeGraphQLRequest";
import GetHomePageStrings from "../shared/models/GetHomePageStrings";
import Home from "../components/Home";

// Type data
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { HomePageSchema } from "../shared/models/GetHomePageStrings";

// Props passed down to page component
export type Props = {
  strings: HomePageSchema;
  locale: string;
  locales: string[];
};

// Context params interface
export interface Params extends ParsedUrlQuery {
  locale: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const locale = context.locale ?? "en";
  const locales = context.locales ?? ["en"];

  try {
    const { homePage } = await makeGraphQLRequest(locale, GetHomePageStrings);
    return {
      props: {
        strings: homePage,
        locale,
        locales,
      },
    };
  } catch (error) {
    // if any errors, return 404
    return {
      notFound: true,
    };
  }
};

/* EXPORT COMPONENT */
export default Home;

// See https://github.com/vercel/next.js/discussions/16522?sort=old
