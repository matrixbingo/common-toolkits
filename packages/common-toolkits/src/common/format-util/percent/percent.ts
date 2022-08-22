import { floor, isEmpty, isString } from 'lodash';
import TypeUtil from '../../type-util';

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

export default percent;
