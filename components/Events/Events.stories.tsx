import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Events from './Events';

export default {
  title: 'Events Screen',
  component: Events
} as ComponentMeta<typeof Events>;


const Template: ComponentStory<typeof Events> = (args) => <Events {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  eventSeasons:[],
  locale: 'en',
  seasonalEvents: [],
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