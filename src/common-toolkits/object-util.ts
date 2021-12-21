/* eslint-disable no-return-assign */
import lodash, { clone, cloneDeep, isArray, isEmpty, isFunction, isObject, isString } from 'lodash';
import Immutable from 'immutable';
import DataUtil from './data-util';
import { ObjectType } from './transform-util';
import ArrayUtil from './array-util';

const getField = (item: Record<string | number, any>, path: string) => {
  if (isString(item) || !item || (item && !path)) return item;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    try {
      if (keys.length === 1) return item[path];
      return keys.reduce((obj, key) => obj[DataUtil.unknown.parseValue(key)], item);
    } catch (e) {
      console.warn('ObjectUtil.getField', item, path);
    }
    return item;
  }
  return item[path];
};

// TODO 可替换
const equals = (a: Array<any> | ObjectType, b:  Array<any> | ObjectType) => {
  return Immutable.is(Immutable.fromJS(a), Immutable.fromJS(b));
};

const toJsonString = (value: string) => {
  return (isString(value) && !isEmpty(value) ? JSON.stringify(JSON.parse(value), null, 2) : JSON.stringify(value, null, 2));
};

/**
 * 清空无效的键值对
 * @param object 
 * @returns 
 */
const cleanObject = (object: Record<any, any> ) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (DataUtil.isVoid(value)) {
      delete result[key];
    }
    if(isObject(value)){
      cleanObject(value);
    }
  });
  return result;
};

/**
 * obj中是否存在value
 * TODO rs[path] 支持多级路径
 * @param obj
 * @param paths
 */
const some = (obj: Record<any, any>, paths: string[] | ((val: any) => boolean), value?: any): boolean => {
  if (obj === null || !ArrayUtil.isNotEmpty(paths)) return false;
  if(isArray(paths)){
    return paths.some((path) => getField(obj, path) === value);
  }
  if(isFunction(paths)){
    return Object.keys(obj).some((key) => paths(obj[key]));
  }
  return false;
};

/**
 * 从obj中取出keys，返回新的obj
 * TODO rs[path] 支持多级路径
 * @param obj {id:1,name:tom,age:20}
 * @param paths [name, age]
 * @returns {name:tom,age:20}
 */
const pick = (obj: Record<any, any> , paths: string[] | ((val: any) => boolean)): Record<any, any>  => {
  if(isArray(paths)){
    return paths.reduce((rs, path) => {
      rs[path] =  getField(obj, path);
      return rs;
    }, {} as Record<any, any>);
  }
  if(isFunction(paths)){
    return Object.keys(obj).reduce((rs, path) => {
      const item = getField(obj, path);
      if(paths(cloneDeep(item))){
        rs[path] = item;
      }
      return rs;
    }, {} as Record<any, any>);
  }
  return obj;
};

/**
 * 取反过滤 pick
 * TODO rs[path] 支持多级路径
 * @param obj {id:1,name:tom,age:20}
 * @param paths [name, age]
 * @returns {name:tom,age:20}
 */
const omit = (obj: Record<any, any>, paths: string[] | ((val: any) => boolean)): Record<any, any> => {
  if(isArray(paths)){
    return Object.keys(obj).reduce((rs, path) => {
      if (!paths.includes(path)) {
        rs[path] =  getField(obj, path);
      }
      return rs;
    }, {} as Record<any, any>);
  }
  if(isFunction(paths)){
    return Object.keys(obj).reduce((rs, path) => {
      const item = getField(obj, path);
      if(!paths(cloneDeep(item))){
        rs[path] = item;
      }
      return rs;
    }, {} as Record<any, any>);
  }
  return obj;
};

export default {
  getField,
  equals,
  toJsonString,
  cleanObject,
  some,
  pick,
  omit,
};