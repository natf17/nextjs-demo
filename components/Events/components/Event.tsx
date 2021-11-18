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
    try {
      return new Intl.DateTimeFormat(locale, {
        month: 'short',
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
    <>      
      <article
        className={`
          rounded-lg shadow p-3 overflow-hidden
          ${monthsToColorsMap[monthNumber].bg_light}
          grid grid-cols-3 auto-rows-min gap-1
        `}
      >
        {/* Localized day name */}
        <div className='flex items-center text-gray-600 text-lg lowercase bg-blue-100'>
          {getLocalizedDayName(locale, startDate)}.
        </div>

        {/* Localized month */}
        <div className='flex items-center text-xl lowercase italic bg-red-100 justify-center'>
          {localizedMonthFormatter(locale, startDate)}
        </div>

        {/* Day date */}
        <div className='flex items-center text-4xl bg-yellow-300'>
          { getDayNumber(startDate) }
        </div>

        {/* Language */}
        <div className='text-gray-600 italic text-lg col-span-full text-center bg-green-200'>
          <LangIcon color='inherit' fontSize='inherit' /> {eventLanguage}
        </div>
      </article>
    </>
  )
}
