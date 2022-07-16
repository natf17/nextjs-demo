import React from "react";
import {
  EventSeason,
  SeasonalEvent,
} from "../../../shared/models/GetEventData";
import Event from "./Event";
import useLocalizedMonths from "../hooks/useLocalizedMonths";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { EventGroupTypes } from "../Events";
import eventColorsByType from "../config/eventColorsByType";
import { ByMonths, OneBasedMonthNumbers } from "../utils/groupEventsByDate";

type Props = {
  eventSeason?: EventSeason;
  dateYear: number;
  eventsByMonth?: ByMonths<SeasonalEvent>;
  seasonalEventDuration?: number;
  eventType?: EventGroupTypes;
};

const EventMonthsLayoutAnimationVariants = {
  collapsed: {
    opacity: 0,
  },
  expanded: {
    opacity: 1,
  },
};

export default function EventMonthsLayout({
  seasonalEventDuration,
  eventType,
  dateYear,
  eventsByMonth,
}: Props) {
  const { locale = "en" } = useRouter();
  const localizedMonths = useLocalizedMonths({
    locale: locale,
    month: "short",
  });
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayOneBasedMonthNum = today.getMonth() + 1;
  const isPastYear = todayYear > dateYear;

  return (
    <motion.div
      className="pb-4"
      variants={EventMonthsLayoutAnimationVariants}
      layout
    >
      <motion.h2
        className={`text-2xl mb-6
          ${
            isPastYear
              ? "text-gray-400"
              : eventType
              ? eventColorsByType[eventType].text
              : "text-blue-400"
          }
        `}
        layout
      >
        {dateYear}
      </motion.h2>

      <div className="px-2">
        {eventsByMonth &&
          Object.keys(eventsByMonth).map((oneBasedMonthNumString) => {
            const oneBasedMonthNumInt = parseInt(oneBasedMonthNumString);
            const isPastMonth = todayOneBasedMonthNum > oneBasedMonthNumInt;

            return (
              <AnimatePresence key={oneBasedMonthNumString}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`
                border-l-4 ${
                  isPastYear || isPastMonth
                    ? "border-gray-400"
                    : eventType
                    ? eventColorsByType[eventType].month
                    : "border-blue-400"
                } pl-4 mb-8 last:mb-0
                grid grid-cols-[5em_1fr]                
              `}
                  layout
                >
                  {/* Col 1: Month */}
                  <motion.div
                    className={`${
                      isPastYear || isPastMonth
                        ? "text-gray-400"
                        : "text-blue-300"
                    } uppercase`}
                    // only animate position in layout changes (prevents stretching)
                    layout="position"
                  >
                    {localizedMonths[oneBasedMonthNumInt - 1]}
                  </motion.div>

                  <motion.div
                    className={`                  
                  grid grid-cols-[repeat(auto-fill,_minmax(10em,_1fr))]
                  auto-rows-auto gap-6
                `}
                  >
                    {/* Cols 2 to n: Events  */}
                    {eventsByMonth?.[
                      oneBasedMonthNumInt as OneBasedMonthNumbers
                    ]?.map((e) => (
                      <Event
                        key={e.id}
                        id={e.id}
                        startDate={e.startDate}
                        eventLanguage={e.eventLanguage}
                        monthNumber={oneBasedMonthNumInt.toString()}
                        duration={seasonalEventDuration ?? 1}
                        eventType={eventType}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            );
          })}
      </div>
    </motion.div>
  );
}
