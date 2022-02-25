/**
 * @desc 첫번째 인자는 배열, 두번째 인자는 value의 값을받아, 배열의 아이템을 key, value의 값을 value로 하는 오브젝트를 리턴한다.
 * @param {any[]} array
 * @param {any} value
 * @returns {[key:string]: boolean}
 */

export const initializedObjValue = (array, value = false) => {
  if (!Array.isArray(array))
    return console.error(
      "initializedObjValue에 제공된 인자는 배열이여야 합니다"
    );
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(array[i]);
  }
  const result = newArray.sort().reduce((newObj, key) => {
    newObj[key] = value;
    return newObj;
  }, {});
  return result;
};
