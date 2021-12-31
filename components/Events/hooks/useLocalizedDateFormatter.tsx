type Props = {
  locale: string,  
  dateTimeFormat: Intl.DateTimeFormatOptions
}



function useLocalizedDateFormatter({locale, dateTimeFormat}: Props) {
  const formatter = Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    ...dateTimeFormat,
  });

  // return localized & formatted function
  return (date: Date) => {
    return formatter.format(new Date(date));
  }
}


export default useLocalizedDateFormatter;