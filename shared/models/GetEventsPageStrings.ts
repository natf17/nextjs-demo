import { gql } from "@apollo/client";

// separated types for easy type separation and import from modules
export type EventsPageSchema = {
  pageTitle: string;
  pageDescription: string;
  eventLangPickerLabel: string;
  general: GeneralStrings;
  sectionRegCo: {
    title: string;
    btn_text: string;
  };
  sectionCACO: {
    title: string;
    btn_text: string;
  };
  sectionCABR: {
    title: string;
    btn_text: string;
  };
  sectionOtherEvents: {
    title: string;
    btn_text: string;
  };
};

export type GeneralStrings = {
  eventThemeLabel: string;
  durationLabel: string;
  yearsShowingLabel: string;
  dateLabel: string;
  eventLangLabel: string;
  noEventsFound: string;
};

const query = (locale = "en") => {
  return gql/* GraphQL */ `
    query {
      eventsPage(locale: "${locale}") {
        pageTitle
        pageDescription
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
          btn_text
        }
        sectionCACO {
          title
          btn_text
        }
        sectionCABR {
          title
          btn_text
        }
        sectionOtherEvents {
          title
          btn_text
        }
      }
    }  
  `;
};

export default query;
