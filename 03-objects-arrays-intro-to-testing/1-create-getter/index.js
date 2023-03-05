/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  return (obj) => {
    const functionArray = path.split('.');
    let result = {...obj};
    for (let item of functionArray) {
      if (!result.hasOwnProperty(item)) {
        return undefined;
      }
      result = result[item];
    }

    return result;
  };
}
