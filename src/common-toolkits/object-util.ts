/* eslint-disable no-return-assign */
import lodash, { clone, cloneDeep, isArray, isEmpty, isFunction, isObject, isString } from 'lodash';
import Immutable from 'immutable';
import DataUtil, { ObjectType } from './data-util';
import ArrayUtil from './array-util';

/**
 * 判断key在object内
 * @param key 
 * @param object 
 * @returns 
 */
export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

/**
 * 给目标对象添加属性，如果没有则创建
 * @param target {a:1}
 * @param key 'a'
 * @param value c
 * @returns 
 */
const setValue = (target: Record<string, any> | any[], key: string, value: any): Record<any, any> => {
  if(!target || !key) return {key: value};
  if (key === '__proto__') {
    Object.defineProperty(target, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    if(target[key]) window.console.warn('值被替换:', target,  key, value);
    if(isObject(target)){
      target[key] = value;
    } else if(isArray(target) && DataUtil.unknown.isInt(key)) {
      (target as any[])[Number(key)] = value;
    }
  }
  return target;
}

/**
 * 路径取值
 * @param item {a:[{b:1}]}
 * @param path a.0.b
 * @returns 1
 */
const getField = (item: Record<string | number, any> | string, path: string) => {
  if (isString(item) || !item || !path) return item;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    try {
      if (keys.length === 1) return item[path];
      return keys.reduce((obj, key) => obj[DataUtil.unknown.parseValue(key)], item);
    } catch (e) {
      console.warn('ObjectUtil.getField', item, path, e);
    }
    return item;
  }
  return item[path];
};

/**
 * 路劲赋值
 * @param target 
 * @param path 
 * @param value 
 * @returns 
 */
const setField = (target: Record<any, any>,  path: string, value: any) => {
  if (isString(target) || !target || !path) return target;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    if (keys.length === 1) return setValue(target, path, value); 

    const getVal = (obj: object, curkey: string, nextKey: string) => {
      if(DataUtil.unknown.isInt(nextKey)){
        return obj[nextKey] && isArray(obj[nextKey]) ? obj[nextKey] : [];
      } else {
        if(DataUtil.unknown.isInt(curkey)) return obj[curkey] && isArray(obj[curkey]) ? obj[curkey] : [];
        if(isString(curkey)) return obj[curkey] && isObject(obj[curkey]) ? obj[curkey] : {};
      }
      throw TypeError('getValue: 数据异常')
    }

    const setArrVal = (arr: any[], index: number, val: any) => {
      arr[index] = val
    }

    let nested = target;
    const lastIndex = keys.length - 1
    try {
      keys.forEach((key, index) => {
        if(index < lastIndex){
          const newValue = getVal(nested, key, keys[index + 1]);
          setValue(nested, key, newValue);
        }else{
          setValue(nested, key, value);
        }
        nested = nested[key];
      });
    } catch(e) {
      console.warn('ObjectUtil.setField', value, path, e);
    }
  } else {
    setValue(target, path, value);
  }
  return target;
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
  setField,
  equals,
  toJsonString,
  cleanObject,
  isValidKey,
  some,
  pick,
  omit,
};