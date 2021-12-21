import lodash from 'lodash';
import qs from 'query-string';
import { unique } from './array-util';

export const isInt = (val: string): Boolean => {  //! isNaN(parseInt(previous))
  const regPos = /^\d+(\.\d+)?$/; // 非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  }
  return false;
};
  // isFloat: (num: string): Boolean => {
  //   const reg = new RegExp('^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$'); // 正浮点数
  //   if (reg.test(num)) {
  //     return true;
  //   }
  //   return false;
  // },

/**
     * 中英文逗号，分号，分割
     * @param input
     */
export const splitByComma = (input: string) => {
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
export const splitToNumberArray = (input: string, key = ','): (number)[] => {
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
export const splitToNumberArrayUniqueSort = (input: string, key = ','): (number)[] => {
  const arr = splitToNumberArray(input, key);
  if (lodash.isEmpty(arr)) {
    return [];
  }
  return unique(arr).sort();
};

/**
   * 字符串根据分隔符转数组, 没有分隔符返回[str]
   * @param str
   * @param sign
   * @returns
   */
export const toArrayBySeparator = (str: string, separator = ',') => {
  return str.includes(separator) ? str.split(separator) : Array.prototype.concat.call([], str);
};

export const urlParams = (url: string): { [key: string]: any} => {
  return qs.parse(url.split('?')[1]);
};

export const omit = (value: string, limit = 10): string => {
  if (value && value.length > limit + 3) {
    return `${value.substring(0, limit)}...`;
  }
  return value;
};
