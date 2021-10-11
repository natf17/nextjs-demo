import { EventSeason, SeasonalEvent } from "../../../shared/models/GetEventData"
import Event from "./Event"

type Props = {
  title: string,
  eventSeason?: EventSeason,
  events?: SeasonalEvent[]
}

export default function EventGroup({title, eventSeason, events}: Props) {
  return (
    <article>
      <h2 className='text-2xl uppercase'>{title}</h2>
      {/* Event information */}
      {eventSeason && 
        <ul className='bg-red-200'>
          <li>Theme: {eventSeason.theme}</li>
          <li>Year: {eventSeason.seasonYears}</li>
          <li>Duration (days): {eventSeason.durationDays}</li>
          <li></li>        
        </ul>
      }

      {/* Show some events! */}
      <div className='bg-green-500'>
        { events && events.map((e) => {
            return(
              <Event key={e.id} {...e} />
            )
          })
        }
      </div>
    </article>
  )
}
