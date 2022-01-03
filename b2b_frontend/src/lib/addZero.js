export default function addZero(num) {
  if (num < 10) {
    return "0" + String(num);
  } else {
    return num;
  }
}

