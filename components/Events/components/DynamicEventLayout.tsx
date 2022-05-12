import {
  EventSeason,
  SeasonalEvent,
} from "../../../shared/models/GetEventData";
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings";
import { motion } from "framer-motion";
import SeasonInfo from "./SeasonInfo";
import EventMonthsLayout from "./EventMonthsLayout";
import { EventGroupTypes } from "../Events";

export type Props = {
  title: string;
  eventSeason?: EventSeason;
  events?: SeasonalEvent[];
  stringsGen: GeneralStrings;
  groupType: EventGroupTypes;
  isExpanded: boolean;
  onGroupSelect: (e: EventGroupTypes) => void;
};

// Animation
const variants = {
  expanded: {
    opacity: 1,
    height: "100%",
    display: "block",
  },
  collapsed: {
    opacity: 0,
    height: "0",
    transition: {
      when: "afterChildren",
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function DynamicEventLayout({
  title,
  eventSeason,
  events,
  stringsGen,
}: Props) {
  return (
    <motion.article className="mb-2" layout>
      {/* Event season name */}
      <motion.h2
        className={`        
          text-2xl uppercase select-none
          filter drop-shadow-lg          
          text-blue-300 text-center                  
        `}
        layout
      >
        {title}
      </motion.h2>

      {/* Event season information */}
      {eventSeason && (
        <div className="flex justify-center">
          <SeasonInfo
            theme={eventSeason.theme}
            seasonYears={eventSeason.seasonYears}
            durationDays={eventSeason.durationDays}
            durationText={eventSeason.durationText}
            eventThemeLabel={stringsGen.eventThemeLabel}
            yearsShowingLabel={stringsGen.yearsShowingLabel}
            durationLabel={stringsGen.durationLabel}
          />
        </div>
      )}

      {/* Event data */}
      <motion.div
        className="border-l border-blue-300 pl-4"
        animate="expanded"
        variants={variants}
        initial={false}
        layout
      >
        {/* Show some events! */}
        {events && events.length > 0 ? (
          <EventMonthsLayout
            events={events}
            seasonalEventDuration={eventSeason?.durationDays}
          />
        ) : (
          <motion.div
            layout
            className="text-blue-200 p-2"
            variants={{
              collapsed: {
                opacity: 0,
              },
              expanded: {
                opacity: 1,
              },
            }}
          >
            {stringsGen.noEventsFound}
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
}
