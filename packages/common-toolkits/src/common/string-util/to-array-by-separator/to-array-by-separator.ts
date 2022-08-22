/**
 * 字符串根据分隔符转数组, 没有分隔符返回[str]
 * @param str
 * @param sign
 * @returns
 */
const toArrayBySeparator = (str: string, separator = ',') => {
  return str.includes(separator) ? str.split(separator) : Array.prototype.concat.call([], str);
};

export default toArrayBySeparator;
