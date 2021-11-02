import addZero from "./addZero";

function hitmap(value) {
  const time = value * 9000;
  return `${addZero(Math.floor(time / 1000 / 60))} : ${addZero(Math.floor((time / 1000) % 60))}`;
}

function ward(value) {
  const time = value * 5100;
  return `${addZero(Math.floor(time / 1000 / 60))} : ${addZero(Math.floor((time / 1000) % 60))}`;
}

function nowTime() {
  const now = new Date();
  return `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(now.getDay())} `
}


export default { hitmap, ward, nowTime }