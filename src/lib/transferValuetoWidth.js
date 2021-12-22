export default function transferValuetoWidth(fullTime, fullWidth, time) {
  const time1px = fullTime / 100; // 18 90
  const width1px = fullWidth / 100; // 6.12

  //console.log("transferValuetoWidth", (time / time1px) * width1px);
  return (time / time1px) * width1px;
}