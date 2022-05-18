export default function isDateBeforeFactory(referenceDate: Date) {
  return (date: Date) => {
    return date < referenceDate;
  };
}
