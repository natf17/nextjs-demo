import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import { Public as LangIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';

import monthsToColorsMap from '../config/eventColorsByMonth';


type Props = Pick<SeasonalEvent, 'startDate' | 'eventLanguage'> & {
  monthNumber: string
};


export default function Event
  ({
    startDate, 
    eventLanguage,
    monthNumber
    }:Props
  ){

  const { locale = 'en' } = useRouter();
    
  // TODO: extract into custom hook? (takes in locale, returns fn that generates month names)
  const localizedMonthFormatter: (locale:string, date:string) => string = (locale, date) => {
    console.log(date); 
    try {
      return new Intl.DateTimeFormat(locale, {
        month: 'long',
        timeZone: 'UTC'
      }).format(new Date(date.replace(/-/g, '\/')));
    }
    catch {
      console.error(`Error creating localized month name using locale ${locale} and date ${date}`);
      return 'MONTH';
    }    
  }


  const getLocalizedDayName: (locale:string, date:string) => string = (locale, date) => {
    try {
      return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        timeZone: 'UTC'
      }).format(new Date(date.replace(/-/g, '\/')));
    }
    catch {
      console.error(`Error creating localized day name using locale ${locale} and date ${date}`)
      return 'DAY';
    }
  }

  const getDayNumber: (date:string) => string = (date) => {
    try {
      // RegEx to replace hyphens w dashes for creating correct date
      // see https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
      return new Date(date.replace(/-/g, '\/')).getDate().toString();
    }
    catch {
      console.error(`Error creating day date using date ${date}`)
      return '#'
    }
  }


  return (
    <article className={`rounded-lg bg-${monthsToColorsMap[monthNumber].bg_light} shadow p-1 px-3 overflow-hidden`}>
      {/* Localized day name */}
      <div className='text-gray-600 text-lg pt-1 lowercase'>{getLocalizedDayName(locale, startDate)}.</div>

      {/* Localized month */}
      <header className='text-center lowercase italic text-2xl py-1'>
        { localizedMonthFormatter(locale, startDate)}
      </header>

      {/* Day date */}      
      <div className='text-6xl text-center'>
        {/* Localized day */}
        { getDayNumber(startDate) }
      </div>

      <div className='text-gray-600 italic text-center text-lg pb-3'>
        <LangIcon color='inherit' fontSize='inherit' /> {eventLanguage}
      </div>
    </article>
  )
}
