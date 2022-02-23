
  // 최초 checkbox state의 value값을 false 처리

export const initializedFalseValue = (param, boolean = false) => {
    let newArray = [];
    for (let i = 0; i < param.length; i++) {
      newArray.push(param[i])
    }
    const result = newArray.sort().reduce((newObj, key) => {

      newObj[key] = boolean;
      return newObj;
    },
      {}
    )
    return result;
  }
