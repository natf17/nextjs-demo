import {
  EventSeason,
  SeasonalEvent,
} from "../../../shared/models/GetEventData";
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings";
import { motion } from "framer-motion";
import EventMonthsLayout from "./EventMonthsLayout";
import { EventGroupTypes } from "../Events";
import EventInformationPane from "./EventInformationPane";

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
        {/* Show some events! */}
        {events && events.length > 0 ? (
          <EventMonthsLayout
            events={events}
            seasonalEventDuration={eventSeason?.durationDays}
            eventType={groupType}
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
