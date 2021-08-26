import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetGlobalStrings from '../shared/queries/GetGlobalSettings';
import Home from '../components/Home'

import { GetStaticProps } from 'next';

/* EXPORT COMPONENT */
export default Home;




// BEGIN REFACTOR
import { ParsedUrlQuery } from 'querystring';
type StringData = {
  kioskTitle: string,
  venueName: string,
  locale: string,
  localizations: {
    id: string | number,
    locale: string
  }
}

type Props = {
  strings: StringData,
  locale: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const locale = context.locale!;
  const data = await makeGraphQLRequest(locale, GetGlobalStrings);

  return {
    props: { 
      strings: data.globalSetting,
      locale
    }
  }
}





/* SERVER SIDE CONFIG -- WORKING CODE, TO REFACTOR */
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

