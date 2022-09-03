import { isFunction, isNumber, isString } from 'lodash';
import { ObjectType, Raw } from '../../types';
import removeByItemIndex from '../remove-by-item-index/remove-by-item-index';

/**
 * 删除指定值，支撑自定义
 * @param arr [{a:1}, {b:2}]
 * @param customizer (v) => v.a === 1
 * @returns [{b:2}]
 */
const remove = <T extends Raw | ObjectType>( arr: T[], customizer: T | ((val: T) => boolean)): Array<T> => {
  if (isString(customizer) || isNumber(customizer)) {
    removeByItemIndex(arr, customizer);
  }
  if (isFunction(customizer)) {
    return arr.filter((i) => !customizer(i));
  }
  return arr;
};

export default remove;
