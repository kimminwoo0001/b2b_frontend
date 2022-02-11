/**
 * @file isEqual - 제공 받은 객체의 속성 중 'all'을 제외한 모든 키의 값이 같은 지 판별하는 함수
 * @author kimminwoo (2022.02.11)
 * @param {object} obj - {[key]:string : bolean}을 가지는 객체
 * @example
 * step1 = {all: false,  gnar: true, teemo: false} // 자료형
 * isEqual(step1) // 호출
 * @returns {boolean} 객체의 속성중 'all'을 제외한 값이 모두 같은 지 판별 후 boolean 리턴
 */

export const isObjEqual = (obj) => {
  const result = Object.entries(obj)
    .map(([name, value]) => {
      if (name !== "all") {
        return value;
      }
    })
    .filter((item) => item !== undefined);

  if (result && result.length > 0) {
    return result.every((value) => value === result[0]);
  }
};
