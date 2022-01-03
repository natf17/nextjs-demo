type Props = Pick<Intl.DateTimeFormatOptions, "month"> & {
  locale: string;
};

function useLocalizedMonths({ locale, month: monthFormat = "long" }: Props) {
  const mm = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const formatter = new Intl.DateTimeFormat(locale, {
    month: monthFormat,
    timeZone: "UTC",
  });

  const monthDates = mm.map((month) => {
    // set month date to second calendar day to avoid any time zone collisions
    return new Date(`2020-${month}-02T00:00:00+00:00`);
  });

  return monthDates.map((monthDate) => formatter.format(monthDate));
}

export default useLocalizedMonths;
