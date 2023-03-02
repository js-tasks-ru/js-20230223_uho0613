/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sortedArray = [...arr];
  const collator = new Intl.Collator('ru-RU',{caseFirst: 'upper',sensitivity: "variant"});
  sortedArray.sort((a, b) => collator.compare(a, b));

  if (param === 'desc') {
    sortedArray.reverse();
  }

  return sortedArray;
}
