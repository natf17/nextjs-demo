import {
  EventSeason,
  SeasonalEvent,
} from "../../../shared/models/GetEventData";
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings";
import { motion } from "framer-motion";
import EventMonthsLayout from "./EventMonthsLayout";
import { EventGroupTypes } from "../Events";
import EventInformationPane from "./EventInformationPane";
import { useMemo } from "react";
import groupEventsByDate from "../utils/groupEventsByDate";

export type Props = {
  eventTypeNameFull: string;
  eventSeason?: EventSeason;
  events?: SeasonalEvent[];
  stringsGen: GeneralStrings;
  groupType: EventGroupTypes;
  availableLangs: string[];
  currentLang?: string;
  onChooseLang: (langCode: string) => void;
  chooseLangLabel: string;
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
  eventTypeNameFull,
  eventSeason,
  events,
  stringsGen,
  currentLang,
  availableLangs,
  onChooseLang,
  chooseLangLabel,
  groupType,
}: Props) {
  // divide events into years
  const eventsByYearByMonth = useMemo(() => {
    if (events) {
      return groupEventsByDate(events);
    }
    return null;
  }, [events]);

  return (
    <motion.article className="mb-2" layout>
      {/* Event season information */}
      <EventInformationPane
        eventTypeName={eventTypeNameFull}
        eventSeason={eventSeason}
        currentLang={currentLang}
        availableLangs={availableLangs}
        onChooseLang={onChooseLang}
        chooseLangLabel={chooseLangLabel}
      />

      {/* Event data */}
      <motion.div
        className="p-6"
        animate="expanded"
        variants={variants}
        initial={false}
        key={groupType}
        layout
      >
        {eventsByYearByMonth ? (
          // Display by year
          Object.keys(eventsByYearByMonth).map((val) => {
            const year = parseInt(val);

            return (
              <EventMonthsLayout
                key={val}
                events={[]}
                eventsByMonth={eventsByYearByMonth[year]}
                eventSeason={eventSeason}
                seasonalEventDuration={eventSeason?.durationDays}
                eventType={groupType}
                dateYear={year}
              />
            );
          })
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
