import { isString, set } from 'lodash';
import TypeUtil from '../../type-util';
import setValue from '../set-value/set-value';

/**
 * 路劲赋值
 * @param target
 * @param path
 * @param value
 * @returns
 */
const setField = (target: Record<any, any>, path: string, value: any) => {
  if (isString(target) || !target || !path) return target;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    if (keys.length === 1) return setValue(target, path, value);
    try {
      const rs = keys.reduce((arr, next) => {
        if(TypeUtil.isInt(next)){
          arr.push({key: '[' + next +']', type: 'int'});
        }else{
          arr.push({key: next, type: 'string'});
        }
        return arr;
      }, [] as any[]);

      const length = rs.length;
      let path = '';
      rs.forEach((v, i) => {
        if (i === 0){
          path = v.key;
        } else if (i < length){
          if (v.type === 'int'){
            path += v.key;
          } else if (v.type === 'string'){
            path += '.' + v.key;
          }
        }
      });
      set(target, path, value);
    } catch (e) {
      console.warn('ObjectUtil.setField', value, path, e);
    }
  } else {
    setValue(target, path, value);
  }
  return target;
};

export default setField;
