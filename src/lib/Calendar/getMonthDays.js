export default function getMonthDays(mon, monthDays) {
  let result = 0;
  for (let i = 0; i < mon; i++) {
    result += monthDays[i];
  }
  return result;
};