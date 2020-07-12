const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Return the short form of the day string based on the timestamp,
 * using 'Today' if the given date is the same as current local date.
 *
 * @param timestamp UNIX timestamp in seconds
 */
const getDayString = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  return date.getDate() === new Date(Date.now()).getDate()
    ? 'Today'
    : DAYS[date.getDay()];
};

export default getDayString;
