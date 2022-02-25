/**
 * @desc key가 string이고 value가 boolean인 객체를 받아 true인 key만 리턴한다
 * @param {{[key]:string : boolean}} obj
 * @returns {string[]} trueList
 */
export const getTrueValueList = (obj) => {
  if (typeof obj !== "object") return;
  const trueArray = [];
  for (let key in obj) {
    if (obj[key] === true) {
      trueArray.push(key);
    }
  }
  return trueArray;
};
