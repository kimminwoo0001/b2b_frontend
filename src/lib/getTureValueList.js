/**
 * @desc boolean 값을 가지는 객체를 돌면서 true인 key값을 배열로 리턴하는 함수
 * @param {{string : boolean}} obj [key: string] value: boolean 인 객체
 * @returns {string[]} 객체의 value가 true인 key값의 배열
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
