import { isEmpty } from 'lodash';
import TypeUtil from '../../type-util';

const input = {
  /**
   * 取字符串int部分
   */
  getInt: (val: string | number) => {
    if (val === '0' || val === 0) return val;
    if (isEmpty(val)) return '';
    if (!TypeUtil.isInt(val)) {
      val = (val as string).replace(/[^0-9]/gi, '');
      if (!TypeUtil.isInt(val)) {
        return '';
      }
    }
    return parseInt(val as string, 10);
  },
  /**
   * 取字符串float部分
   */
  getFloat: (val: string) => {
    if (val === '0.') return val;
    if (val === '0') return parseFloat(val);
    if (isEmpty(val) || val === '.') {
      return '';
    }
    if (!TypeUtil.isFloat(val)) {
      if (val.includes('.')) {
        const arr = val.split('.');
        if (arr.length > 1) {
          const a = input.getInt(arr[0]);
          if (isEmpty(val)) {
            return '';
          }
          if (TypeUtil.isInt(a)) {
            return String(`${a}.${input.getInt(arr[1])}`);
          }
        }
      } else {
        const a = input.getInt(val);
        if (TypeUtil.isInt(a)) {
          return a;
        }
        return '';
      }
    }
    return parseFloat(val);
  },
};

export default input;
