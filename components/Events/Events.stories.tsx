import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Events from './Events';

export default {
  title: 'Events/Events Screen',
  component: Events
} as ComponentMeta<typeof Events>;


const Template: ComponentStory<typeof Events> = (args) => <Events {...args} />;

export const ScreenWithEvents = Template.bind({});

ScreenWithEvents.args = {
  locale: 'en',
  eventSeasons:[{
    "seasonYears": "2021",
    "serviceYear": 2020,
    "type": "REG",
    "theme": "Powerful by Faith!",
    "id": "1",
    "durationDays": 3
  },
  {
    "seasonYears": "2021-2022",
    "serviceYear": 2021,
    "type": "CACO",
    "theme": "\"Excercise Faith!\"",
    "id": "3",
    "durationDays": 1
  },
  {
    "seasonYears": "2021-2022",
    "serviceYear": 2021,
    "type": "CABR",
    "theme": "Strengthen Your Faith!",
    "id": "5",
    "durationDays": 1
  }],  
  seasonalEvents: [{
   eventLanguage: 'en',
   event_season: {seasonYears: '2020-2021', serviceYear: 2021, type: 'REG', theme: 'Convention theme!'},
   id: '12349876',
   seasonalType: 'REG',
   startDate: '2021-06-02'
  }],
  strings: {
    pageTitle: 'Events',
    pageDescription: 'Page description',
    eventLangPickerLabel: 'Language Picker Label',
    general: {
      dateLabel: 'dateLabel',
      durationLabel: 'durationLabel',
      eventLangLabel: 'eventLangLabel',
      eventThemeLabel: 'eventThemeLabel',
      noEventsFound: 'noEventsFound',
      yearsShowingLabel: 'yearsShowingLabel'
    },
    sectionCABR: {
      title: 'sectionCABR title'
    },
    sectionCACO: {
      title: 'sectionCACO title'
    },
    sectionRegCo: {
      title: 'sectionRegCo title'
    },
    sectionOtherEvents: {
      title: 'sectionOtherEvents title'
    }
  }
};