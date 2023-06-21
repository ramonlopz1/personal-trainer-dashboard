export function formatBRDateTime(date: Date) {
  const localeDate = new Date(date).toLocaleDateString();
  const hour = new Date(date).getUTCHours().toLocaleString();
  let minutes = new Date(date).getUTCMinutes().toString();

  if (minutes.toString().length === 1) {
    minutes = "".concat("0", minutes);
  }

  const BRHour = parseInt(hour) - 3;

  const time = "".concat(BRHour + "", ":", minutes + "", " - ", localeDate);

  return time;
}
