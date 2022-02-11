const noneItem = (len) => {
  const empty = 6 - len;
  let result = [];
  for (let i = 0; i < empty; i++) {
    result.push(i);
  }
  //console.log("result", result);

  return result;
};

export default noneItem;

