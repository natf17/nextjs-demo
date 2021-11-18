import { AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import EventGroup from './components/EventGroup';

// types
import { Props } from '../../pages/events';
import { EventSeason, SeasonalEvent } from '../../shared/models/GetEventData';
export type EventGroupTypes = 'REG' | 'CACO' | 'CABR' | 'OTHER';
type EventGroupsOpenState = { [index: string]: boolean };
// sort events into event types
type EventsByType = {REG: SeasonalEvent[], CACO: SeasonalEvent[], CABR: SeasonalEvent[], other: SeasonalEvent[]};
type FirstSeasonByType = {REG?: EventSeason, CACO?: EventSeason, CABR?: EventSeason, other?: EventSeason};



export default function Events({ strings, eventSeasons, seasonalEvents, locale}: Props) {
  // use locale lang as default eventLang
  const [eventLangFilter, setEventLangFilter] = useState<string | undefined>(undefined);
  const [visibleEvents, setVisibleEvents] = useState<SeasonalEvent[] | null>(null);
  const [eventGroupsOpenState, setEventGroupsOpenState] = useState<EventGroupsOpenState>({
    'REG': false,
    'CACO': false,
    'CABR': false,
    'OTHER': false
  });
  

  function selectEventGroup(eventGroupType:EventGroupTypes) {
    // grab latest state / duplicate

    setEventGroupsOpenState((prevState) => {
      let newState = {...prevState};
      // let newState = Object.assign({}, selectedEventGroup);

      for (const index in newState) {
        if (index === eventGroupType) {
          newState[index] = !prevState[eventGroupType];
        } else {
          newState[index] = false;
        }
      }

      return newState
    })
  }


  // TODO: check browser compatibility
  // const languageTranslation = new Intl.DisplayNames([locale], {type:'language'});
  

  // calculate available languages from events
  const availableLangs = useMemo(() => {
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
      
      <main className='h-full'>
        <header className='text-center p-2 py-6'>
          <h1 className='text-4xl text-blue-50 pb-2'>{strings.pageTitle}</h1>

          <p className='text-lg text-gray-300'>{ strings.pageDescription }</p>

          {/* Language picker */}
          <form className='text-lg text-left w-10/12 mx-auto border-b p-3'>
            <label>
              <span className='text-blue-50'>{strings.eventLangPickerLabel}</span>
              <select value={eventLangFilter} onChange={(e)=>{setEventLangFilter(e.target.value)}}>
                {availableLangs.map((lang) => {
                  return (
                    // Test ECMAScript Intl API
                    // languageTranslation.of(lang) -- currently disabled for production (see line 47)
                    <option key={lang} value={lang}>{lang}</option>
                  );
                })}
              </select>          
            </label>
          </form>
        </header>
        
        <AnimateSharedLayout>
        <motion.div className='px-3 py-6' layout>
          <EventGroup 
            title={strings.sectionRegCo.title}
            eventSeason={firstSeasonByType.REG}
            events={eventsByType.REG}
            stringsGen={strings.general}

            groupType='REG'
            onGroupSelect={selectEventGroup}
            isExpanded={eventGroupsOpenState['REG']}
          />

          <EventGroup 
            title={strings.sectionCACO.title}
            eventSeason={firstSeasonByType.CACO}
            events={eventsByType.CACO}
            stringsGen={strings.general}

            groupType='CACO'
            onGroupSelect={selectEventGroup}
            isExpanded={eventGroupsOpenState['CACO']}
          />

          <EventGroup 
            title={strings.sectionCABR.title}
            eventSeason={firstSeasonByType.CABR}
            events={eventsByType.CABR}
            stringsGen={strings.general}

            groupType='CABR'
            onGroupSelect={selectEventGroup}
            isExpanded={eventGroupsOpenState['CABR']}
          />

          <EventGroup 
            title={strings.sectionOtherEvents.title}
            eventSeason={firstSeasonByType.other}
            events={eventsByType.other}
            stringsGen={strings.general}

            groupType='OTHER'
            onGroupSelect={selectEventGroup}
            isExpanded={eventGroupsOpenState['OTHER']}
          />
        </motion.div>
        </AnimateSharedLayout>
      </main>
    </motion.div>
  )
}
