import { isArray, isFunction, isNumber, isObject, isString } from 'lodash';
import { ObjectType, Raw } from '../../types';

/**
 * 取子集，可自定义取，如果index为true则取下标的子集
 * @param list ['a', 'b', 'c', 'd']
 * @param arr [1, 2]
 * @returns ['a', 'b']
 */
const pick = <T extends Raw | ObjectType>( list: T[], customizer: any[] | ((val: T) => boolean), index = false ): Array<T> => {
  if (isArray(customizer)) {
    if(index){
      return list.filter((_, i) => customizer.includes(i));
    }
    return list.reduce((rs, next) => {
      if(isObject(next)){
        // 对象暂不处理
        // rs.push(next);
      } else if(isNumber(next) || isString(next)){
        if(customizer.includes(next)){
          rs.push(next);
        }
      }
      return rs;
    }, [] as T[]);
  }
  if (isFunction(customizer)) return list.filter((i) => customizer(i));
  return list;
};

export default pick;
