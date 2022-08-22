import lodash, { isObject, isEmpty, forEach, isNumber, isBoolean, isString, isArray, isFunction, has, get, set } from 'lodash';
import input from '../input/input';

/**
 * 乘以100, 添加百分号
 */
const initRate = (rate: string | number, multiply = 100, percent = '%'): string => {
  const value = input.getFloat(String(rate));
  if (isNumber(value)) return (value * multiply) + percent;
  return '0';
};

export default initRate;
