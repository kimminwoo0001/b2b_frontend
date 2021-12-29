import addZero from './addZero'

export default function secToMS(sec) {

  let mm = addZero(Math.floor(sec / 60));
  let ss = addZero(sec % 60);

  return `${mm}:${ss}`;
}