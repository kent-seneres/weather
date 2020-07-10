/**
 * Pad the start of the string with "0" if it has fewer than two characters.
 */
const getPaddedString = (value: number): string =>
  value.toString().padStart(2, '0');

/**
 * Build a time string in the format of HH:MM AM/PM
 * @param timestamp UNIX timestamp
 * @param showMinutes include the minutes, default true
 * @param showPeriod include the AM / PM designator
 */
const getTimeString = (
  timestamp: number,
  showMinutes = true,
  showPeriod = true,
): string => {
  const date = new Date(timestamp * 1000);

  let hour = date.getHours();
  const minutes = date.getMinutes();
  const period = hour < 12 ? 'AM' : 'PM';

  // get the hour value in 12-hour format
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }

  const minuteString = showMinutes ? `:${getPaddedString(minutes)}` : '';
  const periodString = showPeriod ? ` ${period}` : '';
  return `${hour}${minuteString}${periodString}`;
};

export default getTimeString;
