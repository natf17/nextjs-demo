import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetGlobalStrings from '../shared/models/GetGlobalSettings';
import Home from '../components/Home'

// Type data
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';


// API Schema
export type StringData = {
  kioskTitle: string,
  venueName: string,
  locale: string,
  localizations: {
    id: string | number,
    locale: string
  }
}

// Props passed down to page component
export type Props = {
  strings: StringData,
  locale: string
}

// Context params interface
export interface Params extends ParsedUrlQuery {
  locale: string
}



export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const locale = context.locale!;
  
  try {
    const { globalSetting } = await makeGraphQLRequest(locale, GetGlobalStrings);
    return {
      props: {
        strings: globalSetting,
        locale
      }
    }
  } catch (error) {
    // if any errors, return 404
    return {
      notFound: true
    }
  }
}


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

