import { isString } from 'lodash';
import TypeUtil from '../../type-util';

/**
 * 路径取值
 * @param item {a:[{b:1}]}
 * @param path a.0.b
 * @returns 1
 */
const getField = ( item: Record<string | number, any> | string, path: string ) => {
  if (isString(item) || !item || !path) return item;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    try {
      if (keys.length === 1) return item[path];
      return keys.reduce(
        (obj, key) => obj[TypeUtil.parseValue(key)],
        item,
      );
    } catch (e) {
      console.warn('ObjectUtil.getField', item, path, e);
    }
    return item;
  }
  return item[path];
};

export default getField;
