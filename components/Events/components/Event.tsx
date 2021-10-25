import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import { GeneralStrings } from '../../../shared/models/GetEventsPageStrings';
import { Schedule as DurationIcon } from '@material-ui/icons';
import { Public as LangIcon } from '@material-ui/icons';

import { FormattedDate, FormattedDateParts } from 'react-intl';
import { useRouter } from 'next/router';

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

  const { locale = 'en' } = useRouter();
    
  // TODO: extract into custom hook? (takes in locale, returns fn that generates month names)
  const localizedMonthFormatter: (locale:string, date:string) => any = (locale, date) => {    
    try {
      return new Intl.DateTimeFormat(locale, {
        month: 'long',
        timeZone: 'UTC'
      }).format(new Date(date));
    }
    catch {
      console.error(`Error creating localized month name using locale ${locale} and date ${date}`);
      return 'MONTH';
    }    
  }

  return (
    <article className='rounded bg-red-300 shadow overflow-hidden border border-blue-50'>
      <header className='bg-red-900 text-yellow-200 p-1 text-center uppercase'>
      {/* Localized month */}
        { localizedMonthFormatter(locale, startDate)}
      </header>


      <div className='bg-yellow-50 py-2'>
        <div className='text-5xl text-center'>
          {/* Localized day */}
          <FormattedDateParts value={startDate}>
            {parts => (
                <>{ parts.filter((part) => part.type === 'day')[0].value }</>
            )}
          </FormattedDateParts>
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
