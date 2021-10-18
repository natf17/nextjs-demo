import { gql } from '@apollo/client';

// separated types for easy type separation and import from modules
export type EventsPageSchema = {
  pageTitle: string,
  eventLangPickerLabel: string,
  general: GeneralStrings,
  sectionRegCo: {
    title: string
  },
  sectionCACO: {
    title: string
  },
  sectionCABR: {
    title: string
  },
  sectionOtherEvents: {
    title: string
  }
}

export type GeneralStrings = {
  eventThemeLabel: string,
  durationLabel: string,
  yearsShowingLabel: string,
  dateLabel: string,
  eventLangLabel: string,
  noEventsFound: string
}


const query = (locale = "en") => {
  return gql`
    query {
      eventsPage(locale: "${locale}") {
        pageTitle
        eventLangPickerLabel
        general {
          eventThemeLabel
          durationLabel
          yearsShowingLabel
          dateLabel
          eventLangLabel
          noEventsFound
        }
        sectionRegCo {
          title
        }
        sectionCACO {
          title
        }
        sectionCABR {
          title
        }
        sectionOtherEvents {
          title
        }
      }
    }  
  `;
} 

export default query;