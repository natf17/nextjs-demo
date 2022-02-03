import React from "react";
import { SeasonalEvent } from "../../../shared/models/GetEventData";
import { Public as LangIcon } from "@mui/icons-material";
import { useRouter } from "next/router";

import monthsToColorsMap from "../config/eventColorsByMonth";
import useLocalizedDateFormatter from "../hooks/useLocalizedDateFormatter";
import { motion } from "framer-motion";

type Props = Pick<SeasonalEvent, "startDate" | "eventLanguage"> & {
  monthNumber: string;
  duration?: number;
  key: string;
};

export default function Event({
  startDate,
  eventLanguage,
  monthNumber,
  duration = 1,
  key,
}: Props) {
  const { locale = "en" } = useRouter();
  // RegEx to replace hyphens w dashes for creating correct date
  // see https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const sanitizedStartDate = new Date(startDate.replace(/-/g, "/"));
  const sanitizedEndDate = new Date(sanitizedStartDate);
  sanitizedEndDate.setDate(sanitizedEndDate.getDate() + (duration - 1));

  // format: Jul 2
  const formatShortDate = useLocalizedDateFormatter({
    locale,
    dateTimeFormat: { month: "short", day: "numeric" },
  });
  // format: Thurs
  const formatShortDayName = useLocalizedDateFormatter({
    locale,
    dateTimeFormat: { weekday: "short" },
  });

  // left-to-right date ranges
  const localizedDateRange =
    formatShortDate(sanitizedStartDate) +
    (duration > 1 ? ` - ${formatShortDate(sanitizedEndDate)}` : "");
  const localizedDayNameRange =
    formatShortDayName(sanitizedStartDate) +
    (duration > 1 ? ` - ${formatShortDayName(sanitizedEndDate)}` : "");

  return (
    <motion.article
      key={key}
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      className={`
          rounded-lg shadow overflow-hidden p-2
          ${monthsToColorsMap[monthNumber].bg_light}
          grid grid-cols-1 auto-rows-min gap-1 bg-opacity-20
        `}
      // only animate position in layout changes (prevents stretching)
      layout="position"
    >
      {/* Event info */}
      <div className="text-gray-300 grid grid-cols-eventCardInfoRow text-xs px-2">
        <div className="uppercase">{localizedDayNameRange}</div>
        <div className="uppercase text-right">
          <LangIcon className="text-gray-400" fontSize="inherit" />{" "}
          {eventLanguage}
        </div>
      </div>
      {/* Event date range */}
      <motion.div className="text-gray-50 text-center text-2xl">
        {localizedDateRange}
      </motion.div>
    </motion.article>
  );
}
