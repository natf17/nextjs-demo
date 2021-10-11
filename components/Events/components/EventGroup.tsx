import { EventSeason } from "../../../shared/models/GetEventData"

type Props = {
  title: string,
  eventSeason?: EventSeason
}

export default function EventGroup({title, eventSeason}: Props) {
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
        <article>
          An event
        </article>
      </div>
    </article>
  )
}
