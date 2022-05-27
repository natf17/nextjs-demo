import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

// types
import { Props } from "../../pages/events";
import { SeasonalEvent, SeasonalType } from "../../shared/models/GetEventData";
import DynamicEventLayout from "./components/DynamicEventLayout";
import EventTypeBtn from "./components/EventTypeBtn";
import getEventSeasons from "./utils/getEventSeasons";
import getUniqueLangs from "./utils/getUniqueLangs";
import sortEventsByType from "./utils/sortEventsByType";
export type EventGroupTypes = SeasonalType;

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
    const uniqueLangs = getUniqueLangs(seasonalEvents);

    // ensure system locale is always an "available" lang even if there are no matching events
    if (!uniqueLangs.includes(locale)) {
      uniqueLangs.push(locale);
    }

    return uniqueLangs;
  }, [seasonalEvents, locale]);

  // sort events into event types
  const eventsByType = useMemo(() => {
    return sortEventsByType(visibleEvents);
  }, [visibleEvents]);

  // extract event seasons
  const firstSeasonByType = useMemo(() => {
    return getEventSeasons(eventSeasons);
  }, [eventSeasons]);

  // filter events by locale language by default, even if no events in that locale
  useEffect(() => {
    setEventLangFilter(locale);
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
                <EventTypeBtn
                  eventType={eventType}
                  key={idx}
                  selected={eventType === selectedEventType}
                  onClick={() => onEventTypeSelect(eventType)}
                >
                  {strings[`section${eventType}`].btn_text}
                </EventTypeBtn>
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
