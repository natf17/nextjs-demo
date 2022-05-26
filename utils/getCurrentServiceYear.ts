export default function getCurrentServiceYear() {
  const today = new Date();
  const zeroBasedMonthNum = today.getMonth();
  const year = today.getFullYear();

  // if gte Sept, return current year + 1, otherwise, return current year
  if (zeroBasedMonthNum >= 8) {
    return year + 1;
  }
  return year;
}
