import { SeasonalEvent } from "../../../shared/models/GetEventData";

export type EventsByType = {
  REG: SeasonalEvent[];
  CACO: SeasonalEvent[];
  CABR: SeasonalEvent[];
  OTHER: SeasonalEvent[];
};

export default function sortEventsByType(events?: SeasonalEvent[] | null) {
  const sorted: EventsByType = { REG: [], CACO: [], CABR: [], OTHER: [] };

  if (!events) {
    return sorted;
  }

  events.forEach((event) => {
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

  return sorted;
}
