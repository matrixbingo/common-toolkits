import { cloneDeep, isArray, isFunction } from 'lodash';
import getField from '../get-field/get-field';
import setField from '../set-field/set-field';

/**
 * 从obj中取出keys，返回新的obj
 * @param obj {id:1,name:tom,age:20}
 * @param customizer [name, age]
 * @returns {name:tom,age:20}
 */
const pick = ( obj: Record<any, any>, customizer: string[] | ((val: any) => boolean) ): Record<any, any> => {
  if (isArray(customizer)) {
    const keys = Object.keys(obj);
    return customizer.reduce((rs, path) => {
      if(path.includes('.')){
        setField(rs, path, getField(obj, path));
      }else{
        if (keys.includes(path)) {
          rs[path] = getField(obj, path);
        }
      }
      return rs;
    }, {} as Record<any, any>);
  }
  if (isFunction(customizer)) {
    return Object.keys(obj).reduce((rs, path) => {
      const item = getField(obj, path);
      if (customizer(cloneDeep(item))) {
        setField(rs, path, item);
      }
      return rs;
    }, {} as Record<any, any>);
  }
  return obj;
};

export default pick;
