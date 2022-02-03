import React, { useEffect, useState } from "react";
import { SeasonalEvent } from "../../../shared/models/GetEventData";
import Event from "./Event";
import monthsToColorsMap from "../config/eventColorsByMonth";
import useLocalizedMonths from "../hooks/useLocalizedMonths";
import { AnimatePresence, motion } from "framer-motion";
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
  },
  expanded: {
    opacity: 1,
  },
};

const eventsByMonthTemplate: EventsByMonth = {
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

// For mapping over 12 months
const len12Array = [...Array(12)];

/*
  Component receives events, returns arranged by month
*/
export default function EventMonthsLayout({
  events,
  seasonalEventDuration,
}: Props) {
  const { locale = "en" } = useRouter();
  const localizedMonths = useLocalizedMonths({
    locale: locale,
    month: "short",
  });

  // Holds events arranged by month
  const [eventsByMonth, setEventsByMonth] = useState<EventsByMonth>(
    // deep clone events template object
    JSON.parse(JSON.stringify(eventsByMonthTemplate))
  );

  // arrange events by month
  useEffect(() => {
    // deep clone events-by-month template
    let updatedEventsByMonth: EventsByMonth = JSON.parse(
      JSON.stringify(eventsByMonthTemplate)
    );

    // create date and push into new object
    events.forEach((event) => {
      try {
        const monthNum =
          new Date(event.startDate.replace(/-/g, "/")).getMonth() + 1;
        updatedEventsByMonth[monthNum].push(event);
      } catch {
        console.error(
          `Error creating Date object from SeasonalEvent startDate ${event.startDate}. Skipping event.`
        );
      }
    });

    setEventsByMonth(updatedEventsByMonth);
  }, [events]);

  return (
    <motion.div
      className="px-2 py-4"
      variants={EventMonthsLayoutAnimationVariants}
      layout
    >
      {/* 12 months */}
      {len12Array.map((_, monthIndex) => (
        // Track showing/hiding month rows
        <AnimatePresence key={monthIndex}>
          {eventsByMonth[monthIndex + 1].length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`
                border-l-8 ${
                  monthsToColorsMap[monthIndex + 1].border_accent
                } pl-4 mb-8 last:mb-0
                grid grid-cols-[5em_1fr]                
              `}
              layout
            >
              {/* Col 1: Month */}
              <motion.div
                className={`text-blue-300 uppercase`}
                // only animate position in layout changes (prevents stretching)
                layout="position"
              >
                {localizedMonths[monthIndex]}
              </motion.div>

              <motion.div
                className={`                  
                  grid grid-cols-[repeat(auto-fill,_minmax(12em,_1fr))]
                  auto-rows-auto gap-8
                `}
              >
                {/* Cols 2 to n: Events  */}
                {eventsByMonth[monthIndex + 1].map((e) => (
                  <Event
                    key={e.id}
                    startDate={e.startDate}
                    eventLanguage={e.eventLanguage}
                    monthNumber={(monthIndex + 1).toString()}
                    duration={seasonalEventDuration ?? 1}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </motion.div>
  );
}
