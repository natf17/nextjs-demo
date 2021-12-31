type Props = {
  locale: 'en' |'es',
  date: Date,
  dateTimeFormat: Intl.DateTimeFormatOptions
}


function useLocalizedDateFormat({locale, date, dateTimeFormat}: Props) {
  try {
    return new Intl.DateTimeFormat(locale, {
      ...dateTimeFormat,
      timeZone: 'UTC'
    }).format(new Date(date));
  }
  catch {
    console.error(`Error creating localized day name using locale ${locale} and date ${dateTimeFormat}`)
    return undefined
  }
}


export default useLocalizedDateFormat;