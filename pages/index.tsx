import makeGraphQLRequest from "../utils/makeGraphQLRequest";
import GetHomePageStrings, {
  getMultiLangQuery,
  MultiLangData,
} from "../shared/models/GetHomePageStrings";
import Home from "../components/Home";

// Type data
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { HomePageSchema } from "../shared/models/GetHomePageStrings";

// Props passed down to page component
export type Props = {
  strings: HomePageSchema;
  rotatingI18nData: MultiLangData;
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
  // Use locales configured in next.config.js
  const locale = context.locale ?? "en";
  const locales = context.locales ?? ["en"];

  try {
    const { homePage } = await makeGraphQLRequest(locale, GetHomePageStrings);
    const rotatingI18nData = await makeGraphQLRequest(
      locale,
      getMultiLangQuery.bind(null, locales)
    );

    return {
      props: {
        strings: homePage,
        rotatingI18nData,
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
