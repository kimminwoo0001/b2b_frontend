
export default function checkSeason(filters) {
  return filters.season.includes(undefined) === false && filters.season.length > 0;
}
