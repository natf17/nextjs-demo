import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

// types
import { Props } from "../../pages/events";
import { EventSeason, SeasonalEvent } from "../../shared/models/GetEventData";
import DynamicEventLayout from "./components/DynamicEventLayout";
export type EventGroupTypes = "REG" | "CACO" | "CABR" | "OTHER";

// sort events into event types
type EventsByType = {
  REG: SeasonalEvent[];
  CACO: SeasonalEvent[];
  CABR: SeasonalEvent[];
  OTHER: SeasonalEvent[];
};
type FirstSeasonByType = {
  REG?: EventSeason;
  CACO?: EventSeason;
  CABR?: EventSeason;
  OTHER?: EventSeason;
};

const EVENT_TYPES: EventGroupTypes[] = ["REG", "CACO", "CABR"];

export default function Events({
  strings,
  eventSeasons,
  seasonalEvents,
  locale,
}: Props) {
  // use locale lang as default eventLang
  const [eventLangFilter, setEventLangFilter] = useState<string | undefined>(
    undefined
  );
  const [visibleEvents, setVisibleEvents] = useState<SeasonalEvent[] | null>(
    null
  );
  const router = useRouter();

  const [selectedEventType, setSelectedEventType] =
    useState<EventGroupTypes | null>(null);

  // calculate available languages from events
  const availableLangs = useMemo(() => {
    let langs: string[] = [];
    seasonalEvents.map((e) => {
      if (!langs.includes(e.eventLanguage)) {
        langs.push(e.eventLanguage);
      }
    });

    return langs;
  }, [seasonalEvents]);

  // sort events into event types
  const eventsByType = useMemo(() => {
    let sorted: EventsByType = { REG: [], CACO: [], CABR: [], OTHER: [] };
    if (visibleEvents) {
      visibleEvents.forEach((event) => {
        switch (event.seasonalType) {
          case "REG":
            sorted.REG.push(event);
            break;

          case "CACO":
            sorted.CACO.push(event);
            break;

          case "CABR":
            sorted.CABR.push(event);
            break;

          case "OTHER":
            sorted.OTHER.push(event);
            break;
        }
      });
    }

    return sorted;
  }, [visibleEvents]);

  // extract event seasons
  const firstSeasonByType = useMemo(() => {
    let seasonsByType: FirstSeasonByType = {};

    seasonsByType.REG = eventSeasons.find((s) => s.type === "REG");
    seasonsByType.CACO = eventSeasons.find((s) => s.type === "CACO");
    seasonsByType.CABR = eventSeasons.find((s) => s.type === "CABR");
    seasonsByType.OTHER = eventSeasons.find((s) => s.type === "OTHER");

    return seasonsByType;
  }, [eventSeasons]);

  // availableEventLangs: if available, filter events by locale language by default
  useEffect(() => {
    if (availableLangs.includes(locale)) {
      setEventLangFilter(locale);
    }
  }, [availableLangs, locale]);

  // eventLang: filter events to match selected lang
  useEffect(() => {
    if (!eventLangFilter) {
      setVisibleEvents(seasonalEvents);
    } else {
      const filtered = seasonalEvents.filter(
        (event) => event.eventLanguage === eventLangFilter
      );
      setVisibleEvents(filtered);
    }
  }, [seasonalEvents, eventLangFilter]);

  // watch URL for selected event type
  useEffect(() => {
    // event type
    const urlEventType = router.query.eventType as EventGroupTypes;

    // validate event type
    if (EVENT_TYPES.indexOf(urlEventType) > -1) {
      setSelectedEventType(urlEventType);
    }
  }, [router]);

  const onEventTypeSelect = (eventType: EventGroupTypes) => {
    router.replace({ query: { eventType } }, undefined, { shallow: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="self-stretch w-full"
    >
      <main className="h-full">
        <header className="text-center p-2 py-6">
          <h1 className="text-4xl text-blue-50 pb-2 mb-12">
            {strings.pageTitle}
          </h1>

          {/* Select event type */}
          <motion.div layout>
            {!selectedEventType && (
              <p className="text-lg text-gray-300 p-2 pb-6 pt-16">
                {strings.pageDescription.toUpperCase()}
              </p>
            )}
            <motion.div layout>
              {EVENT_TYPES.map((eventType, idx) => (
                <button
                  key={idx}
                  className={`
                    rounded-full p-4 px-5 mr-4 last:mr-0 border 
                    ${
                      selectedEventType === eventType
                        ? "bg-slate-300/10 border-slate-300 shadow-md shadow-cyan-500/50 text-blue-400"
                        : "text-slate-400 border-slate-500"
                    }
                  `}
                  onClick={() => onEventTypeSelect(eventType)}
                >
                  <h2
                    className={`        
                    text-2xl uppercase select-none
                    filter drop-shadow-lg          
                    text-center                  
                  `}
                  >
                    {strings[`section${eventType}`].btn_text}
                  </h2>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </header>

        <LayoutGroup>
          {selectedEventType && (
            <motion.div className="px-3 py-6" layout>
              <DynamicEventLayout
                eventTypeNameFull={strings[`section${selectedEventType}`].title}
                eventSeason={firstSeasonByType[selectedEventType]}
                events={eventsByType[selectedEventType]}
                // maybe move into context?
                stringsGen={strings.general}
                chooseLangLabel={strings.eventLangPickerLabel}
                groupType={selectedEventType}
                currentLang={eventLangFilter}
                availableLangs={availableLangs}
                onChooseLang={(langCode) => setEventLangFilter(langCode)}
              />
            </motion.div>
          )}
        </LayoutGroup>
      </main>
    </motion.div>
  );
}
