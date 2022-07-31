import lodash from 'lodash';
import ArrayUtil from './array-util';

/**
 * 中英文逗号，分号，分割
 * @param input
 */
const splitByComma = (input: string) => {
  const arr = input.split(/[\n\s+,，；;]/g);
  lodash.remove( arr, (i) => lodash.isEmpty(i) );
  return arr;
};

/**
 * 字符串转数组,支持中英文标点 1，2，3，4 =>[1,2,3,4]
 * @param input
 * @param key
 */
const splitToNumberArray = (input: string, key = ','): number[] => {
  if (lodash.isEmpty(input)) {
    return [];
  }
  if (key === ',') {
    return splitByComma(input)?.map((v) => parseInt(v, 10));
  }
  return input?.split(key)?.map((v) => parseInt(v, 10));
};

/**
 * 字符串转数组,去重，默认排序
 * @param input
 * @param key
 */
const splitToNumberArrayUniqueSort = (input: string, key = ','): number[] => {
  const arr = splitToNumberArray(input, key);
  if (lodash.isEmpty(arr)) {
    return [];
  }
  return ArrayUtil.unique<number>(arr).sort();
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

const truncate = (value: string, limit = 10): string => lodash.truncate(value, { length: limit, omission: '...' });

export default {
  splitByComma,
  splitToNumberArray,
  splitToNumberArrayUniqueSort,
  toArrayBySeparator,
  truncate,
} as const;
