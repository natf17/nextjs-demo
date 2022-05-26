import { EventSeason, SeasonalEvent } from "./../shared/models/GetEventData";

/**
 * Builds mock event data
 * @param {Object} [seasonData] - Optional season data you want to customize
 * @returns Event Season
 */
export function buildEventSeason({
  durationDays = 3,
  durationText = "3 day event",
  id = "def123",
  seasonYears = "2022",
  serviceYear = 2022,
  theme = "REG Theme",
  type = "REG",
}: Partial<EventSeason> = {}): EventSeason {
  return {
    durationDays,
    durationText,
    id,
    seasonYears,
    serviceYear,
    theme,
    type,
  };
}

/**
 * Builds mock event data
 * @param {Object} [eventData] - Optional event data you want to customize
 * @returns Seasonal Event
 */
export function buildSeasonalEvent({
  eventLanguage = "en",
  event_season = buildEventSeason(),
  id = "abc123",
  seasonalType = "REG",
  startDate = "2022-01-01",
}: Partial<SeasonalEvent> = {}): SeasonalEvent {
  return {
    eventLanguage,
    event_season,
    id,
    seasonalType,
    startDate,
  };
}
