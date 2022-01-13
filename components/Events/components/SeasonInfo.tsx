import React from "react";
import { motion } from "framer-motion";

type Props = {
  eventThemeLabel: string;
  yearsShowingLabel: string;
  durationLabel: string;
  theme: string;
  seasonYears: string;
  durationDays: number;
  durationText: string;
};

export default function SeasonInfo({
  theme,
  seasonYears,
  durationText,
}: Props) {
  const SeasonInfoAnimationVariants = {
    // no animations for now, load with parent
    collapsed: {
      opacity: 0,
    },
    expanded: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="text-gray-200 p-2 max-w-lg"
      variants={SeasonInfoAnimationVariants}
      layout
    >
      <h3 className="border-gray-400 border-b-2 mt-2 p-2 bg-gray-800 bg-opacity-30">
        <span>{seasonYears} • </span>
        <span>{theme} • </span>
        <span>{durationText}</span>
      </h3>
    </motion.div>
  );
}
