export default function ObjCompare(obj1, obj2) {
  const Obj1_keys = Object.keys(obj1);
  const Obj2_keys = Object.keys(obj2);
  if (Obj1_keys.length !== Obj2_keys.length) {
    return false;
  }
  for (let k of Obj1_keys) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
  }
  return true;
}