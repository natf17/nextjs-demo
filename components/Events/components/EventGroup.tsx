import { EventSeason, SeasonalEvent } from "../../../shared/models/GetEventData";
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings";
import { ControlPoint } from "@material-ui/icons";
import Event from "./Event";
import SeasonInfo from "./SeasonInfo";
import EventMonthsLayout from "./EventMonthsLayout";

export type Props = {
  title: string,
  eventSeason?: EventSeason,
  events?: SeasonalEvent[],
  stringsGen: GeneralStrings
}

export default function EventGroup({title, eventSeason, events, stringsGen}: Props) {
  return (
    <article>
      {/* Event season name */}
      <h2 className='text-3xl uppercase'>
        <ControlPoint fontSize="inherit" color="inherit" /> {title}
      </h2>

      {/* Event data */}
      <div className="border-l p-2 pl-4">
        {/* Event season information */}
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
        { (events && events.length > 0) 
          ? <EventMonthsLayout events={events} /> 
          : <>{stringsGen.noEventsFound}</>
        }
      </div>
    </article>
  )
}
