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

/* OLD CODE */
// export async function getStaticProps({ locale })  {
//   // make request for strings on Strapi
//   const data = await makeGraphQLRequest(locale, GetGlobalStrings);

//   // handle request errors with 404
//   if (!data || !data.globalSetting) {
//     return { notFound: true }
//   }

//   // handle Apollo errors (look into documentation) and
//   // separate into utility func for all pages with data fetching

//   // pass down data into component props
//   return {
//     props: {
//       strings: data.globalSetting,
//       locale
//     }
//   }
// }

// See https://github.com/vercel/next.js/discussions/16522?sort=old
