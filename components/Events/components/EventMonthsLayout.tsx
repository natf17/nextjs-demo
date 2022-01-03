import React, { useEffect, useState } from "react";
import { SeasonalEvent } from "../../../shared/models/GetEventData";
import Event from "./Event";
import monthsToColorsMap from "../config/eventColorsByMonth";
import useLocalizedMonths from "../hooks/useLocalizedMonths";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  events: SeasonalEvent[];
  seasonalEventDuration?: number;
};

type EventsByMonth = {
  [index: number]: SeasonalEvent[];
};

const EventMonthsLayoutAnimationVariants = {
  collapsed: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  expanded: {
    opacity: 1,
  },
};

export default function EventMonthsLayout({
  events,
  seasonalEventDuration,
}: Props) {
  // receive all events
  // organize into months
  // layout months into CSS grid rows
  // handle styling associated w each month
  const [eventsByMonth, setEventsByMonth] = useState<EventsByMonth>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  });
  const { locale = "en" } = useRouter();
  const localizedMonths = useLocalizedMonths({
    locale: locale,
    month: "short",
  });

  // TODO: How can we ensure that events are received in chronological order?
  // i.e. so that events within a grid-row are displayed in ascending order

  // sort events
  useEffect(() => {
    let updatedEventsByMonth: EventsByMonth = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };

    events.forEach((event) => {
      // try to create date and push into sorted object
      try {
        const monthNum =
          new Date(event.startDate.replace(/-/g, "/")).getMonth() + 1;
        updatedEventsByMonth[monthNum].push(event);
      } catch {
        console.error(
          `Error creating Date object from SeasonalEvent startDate ${event.startDate}`
        );
      }
    });

    setEventsByMonth(updatedEventsByMonth);
  }, [events]);

  return (
    <motion.div className="px-2 py-4" layout>
      {/* Repeating grid container - track presence with AnimatePresence for language change */}
      {/* TODO: FIX POSSIBLE ARBITRARY ORDERING WITH Object.entries() */}
      {Object.entries(eventsByMonth).map(
        ([monthNum, monthEvents], index) =>
          monthEvents.length > 0 && (
            <motion.div
              key={monthNum}
              variants={EventMonthsLayoutAnimationVariants}
              className={`
                border-l-8 ${monthsToColorsMap[monthNum].border_accent} pl-4 mb-8 last:mb-0
                grid grid-cols-events auto-rows-auto gap-8
              `}
              layout
            >
              <div className={`text-blue-300 uppercase`}>
                {localizedMonths[parseInt(monthNum) - 1]}
              </div>
              {monthEvents.map((event) => {
                return (
                  <Event
                    startDate={event.startDate}
                    eventLanguage={event.eventLanguage}
                    key={event.id}
                    monthNumber={monthNum}
                    duration={seasonalEventDuration ?? 1}
                  />
                );
              })}
            </motion.div>
          )
      )}
    </motion.div>
  );
}

// Eventually create a compressed + expanded version
// of this component (default to compressed) with a
// button to open expanded version. This one will
// take up more space and provided a larger view,
// available only after certain # of events/months
