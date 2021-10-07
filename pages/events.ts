import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetEventsPageStrings from '../shared/models/GetEventsPageStrings';
import Events from '../components/Events'

// Type data
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { EventsPageSchema } from '../shared/models/GetEventsPageStrings';


// Props passed down to page component
export type Props = {
  strings: EventsPageSchema,
  locale: string
}

// Context params interface
export interface Params extends ParsedUrlQuery {
  locale: string
}



export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const locale = context.locale!;
  
  try {
    const { eventsPage } = await makeGraphQLRequest(locale, GetEventsPageStrings);
    return {
      props: {
        strings: eventsPage,
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
export default Events;