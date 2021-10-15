import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import EventGroup from './components/EventGroup';

// types
import { Props } from '../../pages/events';
import { EventSeason, SeasonalEvent } from '../../shared/models/GetEventData';
// sort events into event types
type EventsByType = {REG: SeasonalEvent[], CACO: SeasonalEvent[], CABR: SeasonalEvent[], other: SeasonalEvent[]};
type FirstSeasonByType = {REG?: EventSeason, CACO?: EventSeason, CABR?: EventSeason, other?: EventSeason};



export default function Events({ strings, eventSeasons, seasonalEvents, locale}: Props) {
  // use locale lang as default eventLang
  const [eventLangFilter, setEventLangFilter] = useState<string | null>(null);
  const [visibleEvents, setVisibleEvents] = useState<SeasonalEvent[] | null>(null);
  const [dummyCounter, setDummyCounter] = useState(0);
  

  // calculate available languages from events
  const availableLangs = useMemo(() => {
    console.log('running fn 1')
    let langs:string[] = [];
    seasonalEvents.map((e) => {
      if (!langs.includes(e.eventLanguage)) {
        langs.push(e.eventLanguage);
      }
    });

    return langs;
  }, [seasonalEvents])


  // sort events into event types
  const eventsByType = useMemo(() => {
    let sorted:EventsByType = {REG: [], CACO: [], CABR: [], other: []}
    if (visibleEvents) {
      visibleEvents.forEach((event) => {
        switch (event.seasonalType) {
          case 'REG':
            sorted.REG.push(event);
            break;

          case 'CACO':
            sorted.CACO.push(event);
            break;

          case 'CABR': 
            sorted.CABR.push(event);
            break;

          case 'OTHER':
            sorted.other.push(event);
            break;
        }
      });      
    }

    return sorted;
  }, [visibleEvents]);


  // extract event seasons
  const firstSeasonByType = useMemo(()=> {
    let seasonsByType: FirstSeasonByType = {}

    seasonsByType.REG = eventSeasons.find((s) => s.type === 'REG');
    seasonsByType.CACO = eventSeasons.find((s) => s.type === 'CACO');
    seasonsByType.CABR = eventSeasons.find((s) => s.type === 'CABR');
    seasonsByType.other = eventSeasons.find((s) => s.type === 'OTHER');

    return seasonsByType;

  }, [eventSeasons])


  // availableEventLangs: if available, filter events by locale language by default
  useEffect(() => {
    if (availableLangs.includes(locale)) {
      setEventLangFilter(locale);
    }    
  }, [availableLangs, locale])


  // eventLang: filter events to match selected lang
  useEffect(() => {    
    if (!eventLangFilter) {
      setVisibleEvents(seasonalEvents);
    }
    
    else {
      const filtered = seasonalEvents.filter((event) => event.eventLanguage === eventLangFilter);
      setVisibleEvents(filtered);
    }
    
  }, [seasonalEvents, eventLangFilter])


  

  

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='self-stretch w-full'
    >
      
      <main className='bg-green-100 h-full'>
        <h1 className='text-4xl text-center p-2'>{strings.pageTitle}</h1>

        <div>{strings.eventLangPickerLabel} <span id="">{eventLangFilter}</span></div>
        {availableLangs.map((lang) => {
          return (
            <div key={lang}>{lang}</div>
          )
        })}

        <br />

        <div> 
          <h1 className='text-xl'>Dummy counter</h1>
          <div>
            <span>{dummyCounter}</span><br />
            <button onClick={()=> {setDummyCounter(dummyCounter - 1)}}>-1</button>
            <button onClick={()=> {setDummyCounter(dummyCounter + 1)}}>+1</button>
          </div>
        </div>
        
        <EventGroup 
          title={strings.sectionRegCo.title}
          eventSeason={firstSeasonByType.REG}
          events={eventsByType.REG}
        />

        <EventGroup 
          title={strings.sectionCACO.title}
          eventSeason={firstSeasonByType.CACO}
          events={eventsByType.CACO}
        />

        <EventGroup 
          title={strings.sectionCABR.title}
          eventSeason={firstSeasonByType.CABR}
          events={eventsByType.CABR}
        />

        <EventGroup 
          title={strings.sectionOtherEvents.title}
          eventSeason={firstSeasonByType.other}
          events={eventsByType.other}
        />
      </main>
    </motion.div>
  )
}
