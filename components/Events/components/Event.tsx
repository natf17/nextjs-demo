import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import { GeneralStrings } from '../../../shared/models/GetEventsPageStrings';
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


  const dayName = 'vie.';
  const monthName = 'mayo';
  const dayDate = '16';
  const eventLang = 'español';

  return (
    <article className='rounded-lg bg-green-50 shadow p-1 px-3 overflow-hidden'>
      {/* Localized day name */}
      <div className='text-gray-600 text-lg pt-1'>{dayName}</div>

      {/* Localized month */}
      <header className='text-center lowercase italic text-2xl py-1'>
        { localizedMonthFormatter(locale, startDate)}
      </header>

      {/* Day date */}      
      <div className='text-6xl text-center'>
        {/* Localized day */}
        <FormattedDateParts value={startDate}>
          {parts => (
              <>{ parts.filter((part) => part.type === 'day')[0].value }</>
          )}
        </FormattedDateParts>
      </div>

      <div className='text-gray-600 italic text-center text-lg pb-3'>
        <LangIcon color='inherit' fontSize='inherit' /> {eventLanguage}
      </div>
    </article>
  )
}
