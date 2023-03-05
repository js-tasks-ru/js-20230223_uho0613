/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sortedArray = [...arr];
  const action = {
    'asc': 1,
    'desc': -1
  };
  if (!Object.keys(action).includes(param)) {
    return false;
  }

  const collator = new Intl.Collator(['ru-RU', 'en-EN'], {
    caseFirst: 'upper',
    sensitivity: "variant"
  });
  sortedArray.sort((a, b) => action[param] * collator.compare(a, b));

  return sortedArray;
}
