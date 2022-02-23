export default function getMonthWeeks(mon, monthDays, firstDays, addDay = 0) {
  let result = 0;
  for (let i = 0; i < mon; i++) {
    result += monthDays[i];
  }
  result = Math.floor((result + firstDays.getDay() + addDay) / 7);
  return result;
};