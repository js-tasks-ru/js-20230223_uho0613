/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sortedArray = [...arr];
  let english = /^[A-Za-z0-9]*$/;
  sortedArray.sort(function (a, b) {
    if (english.test(a[0]) === true && english.test(b[0]) !== true) {
      return 1;
    }
    if (a.toUpperCase() === b.toUpperCase()) {
      if (a === a.toUpperCase()) {
        return 1;
      }
      return -1;
    }
    return a.localeCompare(b);
  });

  if (param === 'desc') {
    sortedArray.reverse();
  }

  return sortedArray;
}
