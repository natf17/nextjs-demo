import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetEventsPageStrings from '../shared/models/GetEventsPageStrings';
import {GetCombinedSeasonalEventData} from '../shared/models/GetEventData';
import Events from '../components/Events'

// Type data
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { EventsPageSchema } from '../shared/models/GetEventsPageStrings';
import { EventSeason, SeasonalEvent } from '../shared/models/GetEventData';

// Props passed down to page component
export type Props = {
  strings: EventsPageSchema,
  eventSeasons: EventSeason[],
  seasonalEvents: SeasonalEvent[],
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
    const { eventSeasons, seasonalEvents} = await makeGraphQLRequest(locale, GetCombinedSeasonalEventData)

    return {
      props: {
        strings: eventsPage,
        eventSeasons,
        seasonalEvents,
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


// customization notes
/*
    Keep in mind NextJS locales should match the
    locales configured as enums in Strapi events
    (e.g. English = 'en' not 'en-us', etc)
    
    This is used to load the correct default event
    languages.
*/