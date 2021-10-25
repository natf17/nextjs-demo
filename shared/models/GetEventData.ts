import { gql } from '@apollo/client';

export type SeasonalType = 'REG' | 'CACO' | 'CABR' | 'OTHER';


export type CombinedSeasonalEventData = {
  eventSeasons: EventSeason[],
  seasonalEvents: SeasonalEvent[]
}

export type EventSeason = {
  id: string,
  type: string,
  durationDays: number,
  theme: string,
  serviceYear: number,
  seasonYears: string
}

export type SeasonalEvent = {
  id: string,
  seasonalType: SeasonalType
  startDate: string,
  eventLanguage: string,
  event_season: {
    serviceYear: number,
    type: SeasonalType,
    theme: string
  }
}


const GetCombinedSeasonalEventData = (locale = "en") => {
  return gql`
    query {
      eventSeasons(locale: "${locale}") {
        id
        type
        durationDays
        theme
        serviceYear
        seasonYears
      }
      seasonalEvents {
        id
        seasonalType
        startDate
        eventLanguage
        event_season {
          serviceYear
          type
          theme
        }
      }
    }  
  `;
} 

export {GetCombinedSeasonalEventData};