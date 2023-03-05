/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }
  if (size === 0) {
    return '';
  }
  let count = 0, arrayResult = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i - 1]) {
      count++;
    } else {
      count = 0;
    }

    if (count < size) {
      arrayResult.push(string[i]);
    }
  }
  return arrayResult.join('');
}
