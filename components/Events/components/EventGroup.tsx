import { EventSeason, SeasonalEvent } from "../../../shared/models/GetEventData"
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings"
import Event from "./Event"

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
        <ul className='bg-red-200'>
          <li>{stringsGen.eventThemeLabel}: {eventSeason.theme}</li>
          <li>{stringsGen.yearsShowingLabel}: {eventSeason.seasonYears}</li>
          <li>{stringsGen.durationLabel}: {eventSeason.durationDays}</li>
          <li></li>        
        </ul>
      }

      {/* Show some events! */}
      <div className='bg-green-500'>
        { events ? 
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
            <span>{stringsGen.noEventsFound}</span>
        }
      </div>
    </article>
  )
}
