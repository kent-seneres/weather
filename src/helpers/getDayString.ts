const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDayString = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  return date.getDate() === new Date(Date.now()).getDate()
    ? 'Today'
    : DAYS[date.getDay()];
};

export default getDayString;
