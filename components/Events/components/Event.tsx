import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import { GeneralStrings } from '../../../shared/models/GetEventsPageStrings';

type Strings = Pick<GeneralStrings, 'dateLabel' | 'eventLangLabel'>;
type SeasonalEventProps = Pick<SeasonalEvent, 'startDate' | 'eventLanguage'>;


export default function Event
  ({
    dateLabel, 
    eventLangLabel, 
    startDate, 
    eventLanguage,
    }: Strings & SeasonalEventProps
  ){
  return (
    <article>
      <span>{dateLabel}: {startDate}</span>
      <span>{eventLangLabel}: {eventLanguage}</span>
    </article>
  )
}
