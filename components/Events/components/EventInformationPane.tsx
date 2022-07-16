import React from "react";
import { motion } from "framer-motion";
import { EventSeason } from "../../../shared/models/GetEventData";
import OptionPicker from "../../shared/ui/forms/OptionPicker";
import { useRouter } from "next/router";

type Props = {
  eventSeason?: EventSeason;
  eventTypeName: string;
  availableLangs: string[];
  onChooseLang: (langCode: string) => void;
  currentLang?: string;
  chooseLangLabel: string;
};

export default function EventInformationPane({
  eventSeason,
  eventTypeName,
  availableLangs,
  onChooseLang,
  currentLang,
  chooseLangLabel,
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

  const router = useRouter();
  const languageTranslation = new Intl.DisplayNames([router.locale!], {
    type: "language",
  });

  const dropdownOptions = availableLangs.map((langCode) => ({
    value: langCode,
    label: languageTranslation.of(langCode),
  }));

  return (
    <motion.div
      className="text-gray-200 p-2 grid grid-cols-6 border-b border-slate-500"
      variants={SeasonInfoAnimationVariants}
      layout
    >
      {/* Left pane */}
      <motion.div
        className="col-span-4 flex flex-col justify-center text-sm"
        layout="position"
      >
        {/* Show event type name */}
        <h3>{eventTypeName.toUpperCase()}</h3>

        {/* Season info if available */}
        {eventSeason && (
          <h3>
            <span>{eventSeason.seasonYears} • </span>
            <span>{eventSeason.theme} • </span>
            <span>{eventSeason.durationText}</span>
          </h3>
        )}
      </motion.div>

      {/* Language picker */}
      <motion.div
        className="col-span-2 text-sm flex justify-end"
        layout="position"
      >
        {currentLang && (
          <div className="flex items-center gap-2">
            <span className="text-blue-50 hidden sm:inline">
              {/* Put general strings in react context? */}
              {chooseLangLabel}{" "}
            </span>
            <OptionPicker
              options={dropdownOptions}
              initialValue={currentLang}
              onSelect={(langCode) => onChooseLang(langCode)}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
