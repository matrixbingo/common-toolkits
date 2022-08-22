import lodash, { isArray, isEmpty, isFunction, isNumber, isObject, isString, set } from 'lodash';
import { Raw } from '../../types';

/**
 * 取补集，可自定义取，如果index为true则取下标的补集, 且如果index为true则customizer 必须是数组
 * @param list [1,2,3,4]
 * @param customizer [1,2]
 * @returns [3,4]
 */
const omit = <T extends Raw | Record<any, any>>( list: T[], customizer: any[] | ((val: T) => boolean), index = false ): Array<T> => {
  if (isArray(customizer)){
    if(index){
      return list.filter((_, i) => !customizer.includes(i));
    }
    return list.reduce((rs, next) => {
      if(isObject(next)){
        rs.push(next);
      } else if(isNumber(next) || isString(next)){
        if(!customizer.includes(next)){
          rs.push(next);
        }
      }
      return rs;
    }, [] as T[]);
  }
  if (isFunction(customizer)) return list.filter((i) => !customizer(i));
  return list;
};

export default omit;
