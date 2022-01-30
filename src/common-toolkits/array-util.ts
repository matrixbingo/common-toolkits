import lodash, { isArray, isEmpty, isFunction, isNumber, isObject, isString } from 'lodash';
import ObjectUtil from './object-util';
import DataUtil from './data-util';
import { ObjectType, Raw } from './types';

/**
 * 给对象数组的每一个对象添加属性
 * @param arr
 * @param item
 * @returns
 */
const assign = <T, S>(arr: T[], item: S): T[] => arr.map((i) => lodash.assign(i, item));

/**
 * TODO 可替换
 * 比较两个数组值是否相等
 * @param arr
 * @param target
 * @returns
 */
const equals = (arr: string | any[], target: string | any[]) => {
  // if the other array is a falsy value, return
  if (!target) return false;

  // compare lengths - can save a lot of time
  if (arr.length !== target.length) return false;

  for (let i = 0, l = arr.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr[i] instanceof Array && target[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arr[i].equals(target[i])) return false;
    } else if (arr[i] !== target[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

/**
 * 根据path对应的value，从arr里查找
 * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @param path  id
 * @param value 'a1'
 * @returns [{id: 'a1', name: 'n1'}]
 */
const filterItemByPath = <T>(arr: T[], path: string, value: any): T[] => arr.filter((e) => value === ObjectUtil.getField(e, path));

/**
* 根据path的对应的value集合，从arr里查找
* @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}, {id: 'a3', name: 'n3'}]
* @param path  id
* @param values ['a1', 'a2']
* @returns [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
*/
const filterItemListByPaths = <T>( arr: T[], path: string, values: any[] ): T[] => {
  return arr.reduce((rs, next) => {
    values.includes(ObjectUtil.getField(next, path)) && rs.push(next);
    return rs;
  }, [] as T[]);
};

/**
 * 判断是否在列表内
 */
const includes = (arr: any[], fun: (item: any) => boolean) => arr.some((i) => fun(i));

/**
 * 创建并初始化一个新数组
 * @param length
 * @param value
 * @returns
 */
const initArray = <T>(length: number = 1, value: T): Array<T> => Array(length).fill(value);

const isNotEmpty = (arr: any): boolean => !isEmpty(arr) && arr?.length > 0;

const mapByKey = (list: { [K: string]: any }[], k = 'id') => list.map((i) => i[k]);


/**
 * 给对象数组的每一个对象添加属性
 * @param arr
 * @param item
 * @returns
 */
const merge = <T, S>(arr: T[], item: S): T[] => arr.map((i) => lodash.merge(i, item));

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
/**
 * 默认简单类型,默认去重push
 */
const push = <T extends Raw | ObjectType>( arr: T[], ele: T, customizer?: (item: T) => boolean ): T[] => {
  const includeFun = customizer ?? (() => arr.indexOf(ele) === -1);
  if (includeFun(ele)) arr.push(ele);
  return arr;
};

/**
 * 向指定index添加值
 * @param arr [{a:['a']}, {b:['b']}, ['v', '2']]
 * @param index 1
 * @param item c
 * @returns  [{a:['a']}, {b:['b', 'c']}]
 */
const pushByIndex = ( arr: ({ [x: string]: any[] } | any[])[], index: number, item: any ): ({ [x: string]: any[] } | any[])[] => {
  if (index > arr.length - 1) {
    arr[index] = [item];
    return arr;
  }
  const ele = arr[index];
  if (isArray(ele)) {
    (<any[]>ele).push(item);
  } else if (isObject(ele)) {
    Object.entries(ele).forEach((kv) => {
      if(isArray(kv[1])){
        kv[1].push(item);
      } else if (isObject(kv[1])) {
        assign(kv[1], item);
      }
    })
  }
  return arr;
};

const removeByIndex = (list: Array<any>, item: any) => {
  const index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
};

/**
 * 删除指定值，支撑自定义
 * @param arr [{a:1}, {b:2}]
 * @param customizer (v) => v.a === 1
 * @returns [{b:2}]
 */
const remove = <T extends Raw | ObjectType>( arr: T[], customizer: T | ((val: T) => boolean)): Array<T> => {
  if (isString(customizer) || isNumber(customizer)) {
    removeByIndex(arr, customizer);
  }
  if (isFunction(customizer)) {
    return arr.filter((i) => !customizer(i));
  }
  return arr;
};

/**
 * 去重,支撑自定义
 * @param arr
 * @returns
 */
const unique = <T>(arr: T[], customizer?: (val: T) => any): Array<T> => {
  if (customizer && isFunction(customizer)) {
    const values = new Set<string>();
    return arr.reduce((rs, i) => {
      const value = customizer(i);
      if (!values.has(value)) {
        values.add(value);
        rs.push(i);
      }
      return rs;
    }, [] as T[]);
  }
  return Array.from(new Set(arr));
};

/**
 * 去重，简单排序，TODO 支撑自定义排序
 * @param arr
 * @returns
 */
const uniqueSort = (arr: any): any[] => unique(arr).sort();

export default {
  assign, equals, filterItemByPath, filterItemListByPaths, includes, initArray, isNotEmpty, mapByKey, merge, omit, pick, push, pushByIndex, remove, unique, uniqueSort
} as const;
