import { EventSeason } from "../../../shared/models/GetEventData";

type SeasonByType = {
  REG?: EventSeason;
  CACO?: EventSeason;
  CABR?: EventSeason;
  OTHER?: EventSeason;
};

export default function getEventSeasons(events?: EventSeason[] | null) {
  let seasonsByType: SeasonByType = {
    REG: undefined,
    CACO: undefined,
    CABR: undefined,
    OTHER: undefined,
  };

  if (!events) {
    return seasonsByType;
  }

  // it is currently allowable for there to be more than one season per event type
  // for now we will assign the season that Array.find() method returns
  seasonsByType.REG = events.find((s) => s.type === "REG");
  seasonsByType.CACO = events.find((s) => s.type === "CACO");
  seasonsByType.CABR = events.find((s) => s.type === "CABR");
  seasonsByType.OTHER = events.find((s) => s.type === "OTHER");

  return seasonsByType;
}
