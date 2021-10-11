import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// types
import { Props } from '../../pages/events';
import { SeasonalEvent } from '../../shared/models/GetEventData';


export default function Events({ strings, eventSeasons, seasonalEvents, locale}: Props) {
  // use locale lang as default eventLang
  const [eventLang, setEventLang] = useState(locale);
  const [filteredByLangEvents, setFilteredByLangEvents] = useState<SeasonalEvent[] | null>(null);

  // filter events to match selected lang
  useEffect(() => {    
    const filtered = seasonalEvents.filter((event) => event.eventLanguage === eventLang);
    setFilteredByLangEvents(filtered);    
  }, [seasonalEvents, eventLang])


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
        

        <article>
          <h2>{strings.sectionRegCo.title}</h2>
          <div>
            Event information
            {eventSeasons.filter(s => s.type === "REG").map((season) => {
              return (
                <div key={season.id}>
                  {season.serviceYear}: {season.theme}
                </div>
              )
            })}

            Events:
            
          </div>
        </article>

        <article>
          <h2>{strings.sectionCACO.title}</h2>
        </article>

        <article>
          <h2>{strings.sectionRegCo.title}</h2>
        </article>

        <article>
          <h2>{strings.sectionOtherEvents.title}</h2>
        </article>

        {eventSeasons.map((season) => {
          <div>H</div> 
        })}
      </main>
    </motion.div>
  )
}
