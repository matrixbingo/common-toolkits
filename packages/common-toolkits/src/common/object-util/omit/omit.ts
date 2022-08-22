import lodash, { cloneDeep, isArray, isFunction } from 'lodash';
import getField from '../get-field/get-field';

/**
 * 取反过滤 pick
 * TODO rs[path] 支持多级路径
 * @param obj {id:1,name:tom,age:20}
 * @param customizer [name, age]
 * @returns {name:tom,age:20}
 */
const omit = ( obj: Record<any, any>, customizer: string[] | ((val: any) => boolean) ): Record<any, any> => {
  if (isArray(customizer)) {
    return lodash.omit(obj, customizer);
    //  const keys = Object.keys(obj);
    // return customizer.reduce((rs, path) => {
    //   if(isString(path) && path.includes('.')){
    //     // TODO
    //     window.console.warn('omit暂不支持path', );
    //     return rs;
    //   } else {
    //     if (keys.includes(path)) {
    //       window.console.log(' path ---------------->', path);
    //       rs = lodash.assign(rs, lodash.omit(obj, [path]));
    //     }
    //   }
    //   return rs;
    // }, {});
  }
  if (isFunction(customizer)) {
    return Object.keys(obj).reduce((rs, path) => {
      const item = getField(obj, path);
      if (!customizer(cloneDeep(item))) {
        rs[path] = item;
      }
      return rs;
    }, {} as Record<any, any>);
  }
  return obj;
};

export default omit;
