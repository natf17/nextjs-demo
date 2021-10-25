import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import Event from './Event';

type Props = {
  events: SeasonalEvent[]
}

export default function EventMonthsLayout({events}: Props) {
  // receive all events
  // organize into months
  // layout months into CSS grid rows
  // handle styling associated w each month

  return (
    <div className='px-2 py-4'>
      {/* Repeating grid container */}
      <div className='border-l-8 border-red-400 p-2 mb-8'>
        <br />
        <br />
        <br />
        <br />
      </div>

      <div className='border-l-8 border-yellow-300 p-4 mb-8
        grid grid-cols-events auto-rows-events gap-2
      '>
        <Event dateLabel='' eventLangLabel='' startDate='' eventLanguage='es' />
        <Event dateLabel='' eventLangLabel='' startDate='' eventLanguage='es' />
        <Event dateLabel='' eventLangLabel='' startDate='' eventLanguage='es' />
        <Event dateLabel='' eventLangLabel='' startDate='' eventLanguage='es' />
      </div>  

      <div className='border-l-8 border-purple-800 p-2 mb-8'>
        <br />
        <br />
        <br />
        <br />
      </div>      
    </div>
  )
}



// Eventually create a compressed + expanded version 
// of this component (default to compressed) with a 
// button to open expanded version. This one will 
// take up more space and provided a larger view, 
// available only after certain # of events/months