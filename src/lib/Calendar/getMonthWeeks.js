export default function getMonthWeeks(mon, monthDays, firstDays) {
  let result = 0;
  for (let i = 0; i < mon; i++) {
    result += monthDays[i];
  }
  result = Math.floor((result + firstDays.getDay()) / 7);
  return result;
};