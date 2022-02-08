
export default function orderStats(value) {
    const a = Object.keys(value);
    let newResult = [];
    for (let i = 0; i < a.length; i++) {
        newResult.push(Number(a[i].substring(3)));
    }
    const result = newResult.sort().reduce(
        (newObj, key) => {
            newObj[key] = value[`val${key}`];
            return newObj;
        },
        {}
    )
    return result;
}