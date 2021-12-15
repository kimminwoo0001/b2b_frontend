export default function transferTimetoWidth(fullTime, fullWidth, time) {
  const time1px = fullTime / 100; // 18
  const width1px = fullWidth / 100; // 6.12

  console.log("transferTimetoWidth", (time / time1px) * width1px);
  return (time / time1px) * width1px;
}