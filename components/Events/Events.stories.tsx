import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Events from "./Events";

export default {
  title: "Events/Events Screen",
  component: Events,
} as ComponentMeta<typeof Events>;

const Template: ComponentStory<typeof Events> = (args) => <Events {...args} />;

export const WithSeasonsAndEvents = Template.bind({});
WithSeasonsAndEvents.args = {
  locale: "en",
  eventSeasons: [
    {
      seasonYears: "2021",
      serviceYear: 2020,
      type: "REG",
      theme: "Powerful by Faith!",
      id: "1",
      durationDays: 3,
      durationText: "Three day event",
    },
    {
      seasonYears: "2021-2022",
      serviceYear: 2021,
      type: "CACO",
      theme: '"Excercise Faith!"',
      id: "3",
      durationDays: 1,
      durationText: "1 day event",
    },
    {
      seasonYears: "2021-2022",
      serviceYear: 2021,
      type: "CABR",
      theme: "Strengthen Your Faith!",
      id: "5",
      durationDays: 1,
      durationText: "1 day event",
    },
  ],
  seasonalEvents: [
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "1",
      seasonalType: "REG",
      startDate: "2021-06-04",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "2",
      seasonalType: "REG",
      startDate: "2021-06-11",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "3",
      seasonalType: "REG",
      startDate: "2021-06-18",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "4",
      seasonalType: "REG",
      startDate: "2021-06-25",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "5",
      seasonalType: "REG",
      startDate: "2021-07-09",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "6",
      seasonalType: "REG",
      startDate: "2021-07-16",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "7",
      seasonalType: "REG",
      startDate: "2021-07-23",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "8",
      seasonalType: "REG",
      startDate: "2021-07-30",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "9",
      seasonalType: "REG",
      startDate: "2021-08-06",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "10",
      seasonalType: "REG",
      startDate: "2021-08-13",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "11",
      seasonalType: "REG",
      startDate: "2021-08-20",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "12",
      seasonalType: "REG",
      startDate: "2021-08-27",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021",
        serviceYear: 2020,
        type: "REG",
        theme: "Powerful by Faith!",
      },
      id: "13",
      seasonalType: "REG",
      startDate: "2021-09-03",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CACO",
        theme: '"Excercise Faith!"',
      },
      id: "14",
      seasonalType: "CACO",
      startDate: "2021-09-24",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CACO",
        theme: '"Excercise Faith!"',
      },
      id: "15",
      seasonalType: "CACO",
      startDate: "2021-10-01",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CABR",
        theme: "Strengthen Your Faith!",
      },
      id: "16",
      seasonalType: "CABR",
      startDate: "2021-10-08",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CABR",
        theme: "Strengthen Your Faith!",
      },
      id: "17",
      seasonalType: "CABR",
      startDate: "2021-09-25",
    },
    {
      eventLanguage: "es",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CABR",
        theme: "Strengthen Your Faith!",
      },
      id: "18",
      seasonalType: "CABR",
      startDate: "2021-10-02",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CACO",
        theme: '"Excercise Faith!"',
      },
      id: "19",
      seasonalType: "CACO",
      startDate: "2021-10-09",
    },
    {
      eventLanguage: "en",
      event_season: {
        seasonYears: "2021-2022",
        serviceYear: 2021,
        type: "CABR",
        theme: "Strengthen Your Faith!",
      },
      id: "20",
      seasonalType: "CABR",
      startDate: "2021-10-15",
    },
  ],
  strings: {
    pageTitle: "Events",
    pageDescription: "Select an item below to view events",
    eventLangPickerLabel: "Seeing events in: ",
    general: {
      dateLabel: "Date",
      durationLabel: "Duration",
      eventLangLabel: "Language",
      eventThemeLabel: "Theme",
      noEventsFound: "There are no events at this time",
      yearsShowingLabel: "Showing",
    },
    sectionCABR: {
      title: "Event type CABR title",
      btn_text: "CABR btn title",
    },
    sectionCACO: {
      title: "Event type CACO title",
      btn_text: "CACO btn title",
    },
    sectionREG: {
      title: "Event type REGO title",
      btn_text: "REGO btn title",
    },
    sectionOTHER: {
      title: "Event type OTHER title",
      btn_text: "OTHER btn title",
    },
  },
};

export const WithSeasonsNoEvents = Template.bind({});
WithSeasonsNoEvents.args = {
  ...WithSeasonsAndEvents.args,
  seasonalEvents: [],
};
