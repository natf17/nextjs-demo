import { gql } from "@apollo/client";

export type SeasonalType = "REG" | "CACO" | "CABR" | "OTHER";

export type CombinedSeasonalEventData = {
  eventSeasons: EventSeason[];
  seasonalEvents: SeasonalEvent[];
};

export type EventSeason = {
  id: string;
  type: string;
  durationDays: number;
  theme: string;
  serviceYear: number;
  seasonYears: string;
  durationText: string;
};

export type SeasonalEvent = {
  id: string;
  seasonalType: SeasonalType;
  startDate: string;
  eventLanguage: string;
  event_season: {
    serviceYear: number;
    seasonYears: string;
    type: SeasonalType;
    theme: string;
  };
};

const GET_COMBINED_SEASONAL_EVENT_DATA = gql`
  query GetCombinedSeasonalEventData($locale: String!, $serviceYear: Int!) {
    eventSeasons(locale: $locale, where: { serviceYear: $serviceYear }) {
      id
      type
      durationDays
      theme
      serviceYear
      seasonYears
      durationText
    }
    seasonalEvents(
      sort: "startDate:asc"
      where: { event_season: { serviceYear: $serviceYear } }
    ) {
      id
      seasonalType
      startDate
      eventLanguage
      event_season {
        serviceYear
        seasonYears
        type
        theme
      }
    }
  }
`;

export { GET_COMBINED_SEASONAL_EVENT_DATA };
