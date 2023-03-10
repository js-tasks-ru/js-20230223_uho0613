/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const functionArray = path.split('.');
  return (obj) => {
    let result = {...obj};
    for (const item of functionArray) {
      if (!Object.hasOwn(result, item)) {
        return result.item;
      }
      result = result[item];
    }

    return result;
  };
}
