
export default function checkRequestBase(filters) {
  let result = false;

  if (filters.league.length > 0 && filters.year.length > 0 && filters.season.length > 0) {
    result = true;
  }
  return result;
}
