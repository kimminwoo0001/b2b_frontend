export default function getLeafYaer(year) {
  const leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return leapYear;
}