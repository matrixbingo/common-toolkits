import { isArray, isEmpty, isFunction, isNumber, isString } from 'lodash';
import ObjectUtil from './object-util';
import DataUtil from './data-util';

type raw = number | string;

/**
 * 简单类型，去重push
 */
const push = <T extends raw>(arr: T[], ele: T): T[] => {
  if (arr.indexOf(ele) === -1) {
    arr.push(ele);
  }
  return arr;
};

/**
 * 向指定index添加值
 * @param arr [{a:['a']}, {b:['b']}]
 * @param index 1
 * @param item c
 * @returns  [{a:['a']}, {b:['b', 'c']}]
 */
const pushByIndex = (arr: { [x: string]: any[]}, index: string | number, item: string): void => {
  item = isEmpty(item) || DataUtil.isVoid(item) ? '' : item;
  if (isEmpty(arr[index])) {
    arr[index] = [];
    arr[index].push(item);
  } else if (isArray(arr[index])) {
    arr[index].push(item);
  }
};

/**
 * 删除指定值，支撑自定义
 * @param arr [{a:1}, {b:2}]
 * @param val (v) => v.a === 1
 * @returns [{b:2}]
 */
const remove = <T extends raw | Record<any, any>>(arr: T[],  arg: T | ((val: T) => boolean)): Array<T> => {
  const removeByIndex = (list: Array<any>, item: any) => {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
  }
  if(isString(arg) || isNumber(arg)){
    removeByIndex(arr, arg);
  }
  if(isFunction(arg)){
    return arr.filter((i) => !arg(i))
  }
  return arr;
};

/**
 * 去重,支撑自定义
 * @param arr 
 * @returns 
 */
const unique = <T>(arr: T[], getValue?: (val: any) => string) : Array<T> => {
  if(getValue && isFunction(getValue)){
    const values = new Set();
    return arr.filter((i: any) => {
      const value = getValue(i);
      if(!values.has(value)){
        values.add(value);
        return true;
      };
      return false;
    });
  }
  return [...new Set(arr)];
};

/**
 * 去重，简单排序，TODO 支撑自定义排序
 * @param arr 
 * @returns 
 */
const uniqueSort = (arr: any): any[] => {
  return unique(arr).sort();
};

const mapByKey = (list: { [K: string]: any }[], k = 'id') => {
  return list.map((i) => i[k]);
};

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

const isNotEmpty = (arr: any): boolean => {
  return arr && !isEmpty(arr) && arr?.length > 0;
};

/**
 * 根据下标的集合取子集，或自定义取
 * @param list ['a', 'b', 'c', 'd']
 * @param arr [1,2]
 * @returns ['a', 'b']
 */
const pick = <T extends raw | Record<any, any>>(list: T[], arg: number[] | ((val: T) => boolean)): Array<T> => {
  if(isArray(arg)) return list.filter((_,i) => arg.includes(i));
  if(isFunction(arg)) return list.filter((i) => arg(i));
  return list;
};

/**
 * 根据下标的集合取补集，或自定义取
 * @param list [1,2,3,4]
 * @param arr [1,2]
 * @returns [3,4]
 */
const omit = <T extends raw | Record<any, any>>(list: T[], arg: number[] | ((val: T) => boolean)): Array<T> => {
  if(isArray(arg)) return list.filter((_,i) => !arg.includes(i));
  if(isFunction(arg)) return list.filter((i) => !arg(i));
  return list;
};

/**
 * 根据path对应的value，从arr里查找
 * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @param path  id
 * @param value 'a1'
 * @returns [{id: 'a1', name: 'n1'}]
 */
const filterItemByPath =<T>(arr: T[], path: string, value: any): T[] => arr.filter((e) => value === ObjectUtil.getField(e, path));

/**
  * 根据path的对应的value集合，从arr里查找
  * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}, {id: 'a3', name: 'n3'}]
  * @param path  id
  * @param values ['a1', 'a2']
  * @returns [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
  */
const filterItemListByPaths= <T>(arr: T[], path: string, values: any[]): T[] => {
  return arr.reduce((rs, next) => {
    values.includes(ObjectUtil.getField(next, path)) && rs.push(next);
    return rs;
  }, [] as T[]);
};

export default {
  push,
  pushByIndex,
  remove,
  unique,
  uniqueSort,
  mapByKey,
  equals,
  isNotEmpty,
  pick,
  omit,
  filterItemByPath,
  filterItemListByPaths,
};