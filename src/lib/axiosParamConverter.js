export default function axiosParamConverter(param) {
  let result = ``;
  if (param !== null && typeof (param) === 'object') {
    const keys = Object.keys(param);
    const values = Object.values(param);

    for (let i = 0; i < Object.keys(param).length; i++) {
      result += `${keys[i]}=${values[i]}`;
      if (i !== Object.keys(param).length - 1) {
        result += '&';
      }
    }
  }
  return result;
}