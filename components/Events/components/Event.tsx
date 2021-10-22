import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import { GeneralStrings } from '../../../shared/models/GetEventsPageStrings';
import { Schedule as DurationIcon } from '@material-ui/icons';
import { Public as LangIcon } from '@material-ui/icons';

import { FormattedDate } from 'react-intl';

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
    <article className='rounded bg-red-300 shadow overflow-hidden border border-blue-50'>
      <header className='bg-red-900 text-yellow-200 p-1 text-center'>MONTH</header>
      <div className='bg-yellow-50 py-2'>
        <div className='text-5xl text-center'>
          <FormattedDate
            value={new Date()}
          />
        </div>

        <div className='text-gray-500 italic text-center'>
          <LangIcon color='inherit' fontSize='inherit' /> {eventLanguage}
        </div>
      </div>
      {/* <span>{dateLabel}: {startDate}</span>
      <span>{eventLangLabel}: {eventLanguage}</span> */}
    </article>
  )
}
