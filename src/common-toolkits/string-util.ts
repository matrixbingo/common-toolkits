import lodash from 'lodash';
import qs from 'query-string';
import ArrayUtil from './array-util';

/**
 * 中英文逗号，分号，分割
 * @param input
 */
const splitByComma = (input: string) => {
  const arr = input.split(/[\n\s+,，；;]/g);
  lodash.remove(arr, (i) => {
    return lodash.isEmpty(i);
  });
  return arr;
};

/**
 * 字符串转数组,支持中英文标点 1，2，3，4 =>[1,2,3,4]
 * @param input
 * @param key
 */
const splitToNumberArray = (input: string, key = ','): (number)[] => {
  if (lodash.isEmpty(input)) {
    return [];
  }
  if (key === ',') {
    return splitByComma(input)?.map((v) => parseInt(v, 10));
  }
  return input?.split(key)?.map((v) => parseInt(v, 10));
};

/**
   * 字符串转数组,去重，排序
   * @param input
   * @param key
   */
const splitToNumberArrayUniqueSort = (input: string, key = ','): (number)[] => {
  const arr = splitToNumberArray(input, key);
  if (lodash.isEmpty(arr)) {
    return [];
  }
  return ArrayUtil.unique(arr).sort();
};

/**
 * 字符串根据分隔符转数组, 没有分隔符返回[str]
 * @param str
 * @param sign
 * @returns
 */
const toArrayBySeparator = (str: string, separator = ',') => {
  return str.includes(separator) ? str.split(separator) : Array.prototype.concat.call([], str);
};

const urlParams = (url: string): { [key: string]: any} => {
  return qs.parse(url.split('?')[1]);
};

const omit = (value: string, limit = 10): string => {
  if (value && value.length > limit + 3) {
    return `${value.substring(0, limit)}...`;
  }
  return value;
};

export default {
  splitByComma,
  splitToNumberArray,
  splitToNumberArrayUniqueSort,
  toArrayBySeparator,
  urlParams,
  omit,
};