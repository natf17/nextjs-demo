import React from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import { Public as LangIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';

import monthsToColorsMap from '../config/eventColorsByMonth';
import useLocalizedDateFormatter from '../hooks/useLocalizedDateFormatter';


type Props = Pick<SeasonalEvent, 'startDate' | 'eventLanguage'> & {
  monthNumber: string,
  duration?: number,
};


export default function Event
  ({
    startDate, 
    eventLanguage,
    monthNumber,
    duration = 1,
    }:Props
  ){

  const { locale = 'en' } = useRouter();
  // RegEx to replace hyphens w dashes for creating correct date
  // see https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const sanitizedStartDate = new Date(startDate.replace(/-/g, '\/'));
  const sanitizedEndDate = new Date(sanitizedStartDate);
  sanitizedEndDate.setDate(sanitizedEndDate.getDate() + (duration - 1));

  // format: Jul 2
  const formatShortDate = useLocalizedDateFormatter({locale, dateTimeFormat: {month: 'short', day: 'numeric'}});
  // format: Thurs
  const formatShortDayName = useLocalizedDateFormatter({locale, dateTimeFormat: {weekday: 'short'}});
  
  // left-to-right date ranges
  const localizedDateRange = formatShortDate(sanitizedStartDate) 
          + ((duration > 1) ? ` - ${formatShortDate(sanitizedEndDate)}` : '' )
  const localizedDayNameRange = formatShortDayName(sanitizedStartDate) 
          + ((duration > 1) ?  ` - ${formatShortDayName(sanitizedEndDate)}` : '');


  return (
    <>      
      <article
        className={`
          rounded-lg shadow overflow-hidden p-2
          ${monthsToColorsMap[monthNumber].bg_light}
          grid grid-cols-1 auto-rows-min gap-1 bg-opacity-20
        `}
      >
        {/* Event info */}
        <div className='text-gray-300 grid grid-cols-eventCardInfoRow text-xs px-2'>
          <div className='uppercase'>{localizedDayNameRange}</div>
          <div className='uppercase text-right'>
            <LangIcon className='text-gray-400' fontSize='inherit' /> {eventLanguage}
          </div>
        </div>
        {/* Event date range */}
        <div className='text-gray-50 text-center text-2xl lowercase'>          
          {localizedDateRange}
        </div>
      </article>
    </>
  )
}
