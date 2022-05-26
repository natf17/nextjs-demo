import { buildSeasonalEvent } from "../../../utils/createMockEvents";
import groupEventsByDate from "./groupEventsByDate";

describe("groupEventsByDate function", () => {
  // events with varying days in a single month
  const EVENTS_MAY_2021 = Array.from({ length: 5 }, (v, i) => {
    return buildSeasonalEvent({ startDate: `2021-05-0${i + 1}` });
  });

  // events with varying months in a single year
  const EVENTS_MONTHS_2022 = Array.from({ length: 5 }, (v, i) => {
    return buildSeasonalEvent({ startDate: `2022-${i + 1}-01` });
  });

  // events spanning two years
  const EVENTS_TWOYEARS = [...EVENTS_MAY_2021, ...EVENTS_MONTHS_2022];

  it("handles empty array argument", () => {
    expect(groupEventsByDate([])).toMatchObject({});
  });

  it("extracts the year from event data", () => {
    expect(groupEventsByDate(EVENTS_MAY_2021)).toMatchObject({
      2021: expect.anything(),
    });
    expect(groupEventsByDate(EVENTS_MONTHS_2022)).toMatchObject({
      2022: expect.anything(),
    });
  });

  it("groups events by year", () => {
    expect(groupEventsByDate(EVENTS_TWOYEARS)).toMatchObject({
      2021: expect.anything(),
      2022: expect.anything(),
    });
  });

  it("groups events by month", () => {
    const mm = ["01", "02", "03", "04", "05"];
    const year = "2022";
    const eventsData = mm.map((val) => {
      return buildSeasonalEvent({ startDate: `${year}-${val}-01` });
    });

    // expected:
    // { 2022: 01: [Event], 02: [Event], ... 05:[Event]}
    const expectedMonthValue = expect.arrayContaining([
      expect.objectContaining({}),
    ]);
    const expectedYearValue = Object.fromEntries(
      mm.map((month) => [parseInt(month), expectedMonthValue])
    );

    expect(groupEventsByDate(eventsData)).toMatchObject({
      [year]: expect.objectContaining(expectedYearValue),
    });
  });
});
