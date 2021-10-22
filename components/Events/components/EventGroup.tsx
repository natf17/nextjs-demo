import { EventSeason, SeasonalEvent } from "../../../shared/models/GetEventData"
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings"
import Event from "./Event"
import SeasonInfo from "./SeasonInfo"

export type Props = {
  title: string,
  eventSeason?: EventSeason,
  events?: SeasonalEvent[],
  stringsGen: GeneralStrings
}

export default function EventGroup({title, eventSeason, events, stringsGen}: Props) {
  return (
    <article>
      <h2 className='text-2xl uppercase'>{title}</h2>
      {/* Event information */}
      {eventSeason && 
        <SeasonInfo 
          theme={eventSeason.theme} 
          seasonYears={eventSeason.seasonYears} 
          durationDays={eventSeason.durationDays}
          eventThemeLabel={stringsGen.eventThemeLabel}
          yearsShowingLabel={stringsGen.yearsShowingLabel}
          durationLabel={stringsGen.durationLabel}
        />
      }

      {/* Show some events! */}
      <div className='bg-green-500 py-2 grid grid-cols-events auto-rows-events gap-2'>
        { (events && events.length) ?             
            events.map((e) => {
              return(
                <Event key={e.id} 
                  dateLabel={stringsGen.dateLabel}
                  eventLangLabel={stringsGen.eventLangLabel}
                  startDate={e.startDate}
                  eventLanguage={e.eventLanguage}                  
                />
              )
            })            
          :
            <span className='col-span-full'>{stringsGen.noEventsFound}</span>
        }
      </div>
    </article>
  )
}
