import { floor, isEmpty, isString } from 'lodash';
import TypeUtil from './type-util';

/**
 * @param num
 * @param precision
 * @param separator
 * @returns {*}
 *=======================================================
 *     formatNumber(10000)="10,000"
 *     formatNumber(10000, 2)="10,000.00"
 *     formatNumber(10000.123456, 2)="10,000.12"
 *     formatNumber(10000.123456, 2, ' ')="10 000.12"
 *     formatNumber(.123456, 2, ' ')="0.12"
 *     formatNumber(56., 2, ' ')="56.00"
 *     formatNumber(56., 0, ' ')="56"
 *     formatNumber('56.')="56"
 *     formatNumber('56.a')=NaN
 *=======================================================
 */
const currency = (num: any, precision: number, separator: string): string => {
  let parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num);
    // 处理小数点位数
    num = String(typeof precision !== 'undefined' ? num.toFixed(precision) : num);
    // 分离数字的小数部分和整数部分
    parts = num.split('.');
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0]
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

    return parts.join('.');
  }
  return '';
};


/**
 * 百分率
 * @param num 0.5
 * @returns "50%""
 */
const percent = (num: string | number, _percent = '%'): string => {
  if (TypeUtil.isFloat(num)) {
    return `${floor(Number(num) * 100, 2)}${_percent}`;
  }
  return '';
};


/**
 * 给数字添加千分位 10000 => 10,000
 * @param num
 * @returns
 */
const thousands = (num: string | number): string => String(num).replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);

/**
 * 格式化，显示用
 * @param value
 * @returns
 */
const json = (value: any) => {
  const stringify = (data: any) =>
    JSON.stringify(
      data,
      (key, value) => {
        switch (true) {
          case typeof value === 'undefined':
            return 'undefined';
          case typeof value === 'symbol':
            return value.toString();
          case typeof value === 'function':
            return value.toString();
          default:
            break;
        }
        return value;
      },
      2,
    );

  return isString(value) ? stringify(JSON.parse(value)) : stringify(value);
};

export default {
  currency, json, percent, thousands,
} as const;
