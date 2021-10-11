import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';



export default function Event({startDate, eventLanguage}: SeasonalEvent) {
  return (
    <article>
      <span>Date: {startDate}</span>
      <span>Language: {eventLanguage}</span>
    </article>
  )
}
