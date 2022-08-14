import { isObject, isNumber, isBoolean, isString, isArray } from 'lodash';
import isJSON from '@stdlib/assert-is-json';
import isJSONObj from 'isjsonobj';

const pattern = {
  BinENG: /^[a-zA-Z][a-zA-Z0-9_]*$/, // 英文开头
  JSON: /[^,:{}\\[\\]0-9.\-+Eaeflnr-u \n\r\t]/,
  int: /^(?:0|[1-9]\d*)$/,
  peInt: /^\+?[1-9]\d*$/, //正整数，不包含0
  neInt: /^-[1-9]\d*$/, //负整数，不包含0
  float: /^(-?\d+)(\.\d+)?$/,
};

/**
   * 是否数字，包含字符串
   */
const isInt = (value: any): Boolean => {
    //! isNaN(parseInt(previous))
    const type = typeof value;
    return type === 'number' || (type !== 'symbol' && pattern.int.test(value));
  };

  /**
   * 正整数，不包含0
   */
const isPeInt = (value: any): Boolean => pattern.peInt.test(value);

  /**
   * 负整数，不包含0
   */
const isNeInt = (value: any): Boolean => pattern.neInt.test(value);

const isFloat = (value: any): Boolean => pattern.float.test(value);

const isJSONFormat = (v: any) => isJSONObj(v) || isJSON(v);

  /**
   * select, checkbox, radio等转格式
   * @param value
   * @returns
   */
const parseValue = ( value: string | ReadonlyArray<string> | number ): number | string => {
  if (isNumber(value)) return value;
  if (isString(value) && isInt(value)) return parseInt(value, 10);
  return value?.toString();
};

const isVoid = (value: unknown) => value === undefined || value === null || value === '' || value === 'undefined' || value === 'null';

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

const isValue = (value: any) => isNumber(value) || isBoolean(value) || isString(value) || isObject(value) || isArray(value) || !!value;

/**
 * 判断字符串是否是十六进制的颜色值
 * @param value
 */
const isColor = (value: string): boolean => /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value);

export default {
  pattern, isInt,
  isPeInt, isNeInt,
  isFloat,
  isJSON: isJSONFormat, parseValue,
  isVoid, isFalsy, isValue,
  isColor
} as const;
