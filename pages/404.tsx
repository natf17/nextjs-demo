import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import Get404PageStrings from '../shared/models/Get404PageStrings';
import Custom404 from "../components/_error/404";

// Type data
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// API Schema
import { Error404PageSchema } from '../shared/models/Get404PageStrings';


// Page component props
export type Props = {
  strings: Error404PageSchema,
  locale: string
}

// Next 'context' params
export interface Params extends ParsedUrlQuery {
  locale: string
}


export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const locale = context.locale!;
  
  try {
    const { error404Page } = await makeGraphQLRequest(locale, Get404PageStrings);
    return {
      props: {
        strings: error404Page,
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
export default Custom404;