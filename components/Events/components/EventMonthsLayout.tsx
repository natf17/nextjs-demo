import React, { useEffect, useState } from 'react';
import { SeasonalEvent } from '../../../shared/models/GetEventData';
import Event from './Event';


type Props = {
  events: SeasonalEvent[]
}


type EventsByMonth = { 
  [index: number]: SeasonalEvent[] 
}

const monthsToColorsMap: { [index: string]: string } = {
  1: 'border-red-400',
  2: 'border-yellow-300',
  3: 'border-purple-800',
  4: 'border-red-400',
  5: 'border-yellow-300',
  6: 'border-purple-800',
  7: 'border-red-400', 
  8: 'border-yellow-300',
  9: 'border-purple-800',
  10: 'border-red-400',
  11: 'border-yellow-300',
  12: 'border-purple-800'
}


export default function EventMonthsLayout({events}: Props) {
  // receive all events
  // organize into months
  // layout months into CSS grid rows
  // handle styling associated w each month
  const [eventsByMonth, setEventsByMonth] = useState<EventsByMonth>({1:[], 2: [], 3: [], 4:[], 5:[], 6: [], 7: [], 8: [], 9:[], 10:[], 11:[], 12: []})

  // TODO: How can we ensure that events are received in chronological order?
  // i.e. so that events within a grid-row are displayed in ascending order

  // sort events
  useEffect(() => {
    let updatedEventsByMonth: EventsByMonth = {1:[], 2: [], 3: [], 4:[], 5:[], 6: [], 7: [], 8: [], 9:[], 10:[], 11:[], 12: []};

    events.forEach((event) => {
      // try to create date and push into sorted object
      try {
        const monthNum = new Date(event.startDate).getMonth() + 1;
        updatedEventsByMonth[monthNum].push(event)
      }
      catch {
        console.error(`Error creating Date object from SeasonalEvent startDate ${event.startDate}`);
      }
    });

    setEventsByMonth(updatedEventsByMonth);
  }, [events])



  return (
    <div className='px-2 py-4'>
      {/* Repeating grid container */}
      {Object.entries(eventsByMonth).map(([monthNum, monthEvents]) =>
        (
          monthEvents.length > 0 &&
            <div key={monthNum} className={`border-l-8 ${monthsToColorsMap[monthNum]} pl-4 mb-8 last:mb-0
              grid grid-cols-events auto-rows-events gap-x-8
            `}>
              {              
                monthEvents.map((event) => {

                  return (
                    <Event 
                      startDate={event.startDate} 
                      eventLanguage={event.eventLanguage} 
                      key={event.id} 
                    />
                  )
                })
              }            
            </div>  
        )
      )} 
    </div>
  )
}



// Eventually create a compressed + expanded version 
// of this component (default to compressed) with a 
// button to open expanded version. This one will 
// take up more space and provided a larger view, 
// available only after certain # of events/months