export default function twitchTimeToMilliSec(hms) {
  let split_h = 0;
  let split_m = 0;
  let split_s = 0;
  //0h34m06s
  if (hms.includes('h')) {
    split_h = hms.split('h');
    if (split_h[1].includes('m')) {
      split_m = split_h[1].split('m');
      if (split_m[1].includes('s')) {
        split_s = split_m[1].split('s');
      }
    }
  }
  return (+split_h[0]) * 60 * 60 + (+split_m[0]) * 60 + (+split_s[0]);
}