import { SeasonalEvent } from "../../../shared/models/GetEventData";

export default function getUniqueLangs(events: SeasonalEvent[]) {
  const langs: string[] = [];

  events.map((e) => {
    if (!langs.includes(e.eventLanguage)) {
      langs.push(e.eventLanguage);
    }
  });

  return langs;
}
