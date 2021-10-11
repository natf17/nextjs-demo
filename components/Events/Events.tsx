import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import EventGroup from './components/EventGroup';

// types
import { Props } from '../../pages/events';
import { EventSeason, SeasonalEvent, SeasonalType } from '../../shared/models/GetEventData';




export default function Events({ strings, eventSeasons, seasonalEvents, locale}: Props) {
  // use locale lang as default eventLang
  const [eventLang, setEventLang] = useState(locale);
  const [filteredByLangEvents, setFilteredByLangEvents] = useState<SeasonalEvent[] | null>(null);

  // filter events to match selected lang
  useEffect(() => {    
    const filtered = seasonalEvents.filter((event) => event.eventLanguage === eventLang);
    setFilteredByLangEvents(filtered);    
  }, [seasonalEvents, eventLang])


  function getFirstSeasonOfType(
    seasonType: SeasonalType
  ): EventSeason | undefined {
    return eventSeasons.find((s) => s.type === seasonType)
  }

  function filterEventsByType(
    seasonType: SeasonalType
  ): SeasonalEvent[] | [] {

    if (!filteredByLangEvents) {
      return []
    }
    
    return filteredByLangEvents.filter((e)=> e.seasonalType === seasonType);    
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='self-stretch w-full'
    >
      
      <main className='bg-green-100 h-full'>
        <h1 className='text-4xl text-center p-2'>{strings.pageTitle}</h1>

        <div>{strings.eventLangPickerLabel} <span id="">{eventLang}</span></div>
        
        <EventGroup 
          title={strings.sectionRegCo.title}
          eventSeason={getFirstSeasonOfType('REG')}
          events={filterEventsByType('REG')}
        />

        <EventGroup 
          title={strings.sectionCACO.title}
          eventSeason={getFirstSeasonOfType('CACO')}
          events={filterEventsByType('CACO')}
        />

        <EventGroup 
          title={strings.sectionCABR.title}
          eventSeason={getFirstSeasonOfType('CABR')}
          events={filterEventsByType('CABR')}
        />

        <EventGroup 
          title={strings.sectionOtherEvents.title}
          eventSeason={getFirstSeasonOfType('OTHER')}
          events={filterEventsByType('OTHER')}
        />
      </main>
    </motion.div>
  )
}
