import makeGraphQLRequest from "../utils/makeGraphQLRequest";
import GetEventsPageStrings from "../shared/models/GetEventsPageStrings";
import Events from "../components/Events";

// Type data
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { EventsPageSchema } from "../shared/models/GetEventsPageStrings";
import { EventSeason, SeasonalEvent } from "../shared/models/GetEventData";
import makeLocalizedGraphQLRequest from "../utils/makeLocalizedGraphQLRequest";
import { GET_COMBINED_SEASONAL_EVENT_DATA } from "../graphql/queries/GetEventData";
import getCurrentServiceYear from "../utils/getCurrentServiceYear";

// Props passed down to page component
export type Props = {
  strings: EventsPageSchema;
  eventSeasons: EventSeason[];
  seasonalEvents: SeasonalEvent[];
  locale: string;
};

// Context params interface
export interface Params extends ParsedUrlQuery {
  locale: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  // GQL required variables
  const locale = context.locale!;
  const serviceYear = getCurrentServiceYear();

  try {
    const { eventsPage } = await makeGraphQLRequest(
      locale,
      GetEventsPageStrings
    );

    const { eventSeasons, seasonalEvents } = await makeLocalizedGraphQLRequest({
      locale: locale,
      query: GET_COMBINED_SEASONAL_EVENT_DATA,
      variables: {
        serviceYear: serviceYear,
      },
    });

    return {
      props: {
        strings: eventsPage,
        eventSeasons,
        seasonalEvents,
        locale,
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
export default Events;

// customization notes
/*
    Keep in mind NextJS locales should match the
    locales configured as enums in Strapi events
    (e.g. English = 'en' not 'en-us', etc)
    
    This is used to load the correct default event
    languages.
*/
