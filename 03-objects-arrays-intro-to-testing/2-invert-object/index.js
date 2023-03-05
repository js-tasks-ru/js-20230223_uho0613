/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (obj === undefined || Object.keys(obj).length === 0) {
    return obj;
  }
  let array = Object.entries(obj), tmpValue = '';
  for (let item of array) {
    tmpValue = item[0];
    item[0] = item[1];
    item[1] = tmpValue;
  }
  return Object.fromEntries(array);
}
