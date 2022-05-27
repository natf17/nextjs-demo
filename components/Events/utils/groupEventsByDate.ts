import { SeasonalEvent } from "../../../shared/models/GetEventData";

export type OneBasedMonthNumbers =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type ByMonths<T> = {
  [month in OneBasedMonthNumbers]?: T[];
};

export type ByYear<T> = {
  [year: number]: ByMonths<T>;
} | null;

/**
 * Groups events by year and month
 * @param {Object[]} events - Events array sorted by date (ascending)
 * @param {string} events[].startDate - The event start date (YYYY-MM-DD)
 */
export default function groupEventsByDate(
  events: SeasonalEvent[]
): ByYear<SeasonalEvent> {
  let eventsByYear: ByYear<SeasonalEvent> = {};

  events.forEach((event) => {
    try {
      const date = new Date(event.startDate);
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1) as OneBasedMonthNumbers;

      const yearExists = !!(eventsByYear && eventsByYear[year]);
      const monthExists = !!(
        eventsByYear &&
        eventsByYear[year] &&
        eventsByYear[year][month]
      );

      // if year doesn't exist yet, add it
      if (!yearExists) {
        eventsByYear = { ...eventsByYear, [year]: {} };
      }

      // if month doesn't exist inside year, add it
      if (!monthExists) {
        // at this point, year index has already been added above
        eventsByYear![year] = { ...eventsByYear![year], [month]: [event] };
      } else {
        // month exists, append event data to existing month data
        eventsByYear![year]![month]!.push(event);
      }
    } catch {
      console.error("Badly formatted date");
    }
  });

  return eventsByYear;
}
