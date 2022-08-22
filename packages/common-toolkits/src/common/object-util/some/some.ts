import { isArray, isFunction } from 'lodash';
import ArrayUtil from '../../array-util';
import getField from '../get-field/get-field';

/**
 * obj中是否存在value
 * @param obj
 * @param paths
 */
const some = ( obj: Record<any, any>, paths: string[] | ((val: any) => boolean), value?: any ): boolean => {
  if (obj === null || !ArrayUtil.isNotEmpty(paths)) return false;
  if (isArray(paths)) {
    return paths.some((path) => getField(obj, path) === value);
  }
  if (isFunction(paths)) {
    return Object.keys(obj).some((key) => paths(obj[key]));
  }
  return false;
};

export default some;

