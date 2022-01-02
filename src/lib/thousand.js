
export default function thousand(value) {
  let result = "";
  if (typeof value === "number") {
    result = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return result;
}