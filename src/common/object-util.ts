/* eslint-disable no-return-assign */
import lodash, { isArray, isEmpty, isObject, isString } from 'lodash';
import * as ArrayUtil from './array-util';
import Immutable from 'immutable';
import DataUtil, { isVoid } from './data-util';
import { ObjectType } from './transform-util';

export const equals = (object1: object, object2: object) => {
  return lodash.isEqual(object1, object2);
};

export const isObjectValueEqual = (a: Array<any> | ObjectType, b:  Array<any> | ObjectType) => {
  return Immutable.is(Immutable.fromJS(a), Immutable.fromJS(b));
};

/**
   * 从obj中取出keys，返回新的obj
   * @param obj
   * @param keys
   */
export const some = (obj: object, keys: string[]): {[k: string]: any} => {
  if (obj === null || keys === null || keys.length === 0) {
    return obj;
  }
  const rs: ObjectType = {};
  keys.forEach((key) => {
    rs[key] = obj[key];
  });
  return rs;
};

export const nullToString = (data: any[]) => {
  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      if (data[key] === null) {
        data[key] = '';
      } else {
        if (Array.isArray(data[key])) {
          data[key] = data[key].map((z: any) => {
            return nullToString(z);
          });
        }
        if (isObject(data[key])) {
          data[key] = nullToString(data[key]);
        }
      }
    });
  } else if (isArray(data)) {
      (data as Array<any>)?.forEach((item) => nullToString(item));
  }
  return data;
};

export const toJsonSring = (value: string) => {
  return (isString(value) && !isEmpty(value) ? JSON.stringify(JSON.parse(value), null, 2) : JSON.stringify(value, null, 2));
};

/**
 * options : [{ id: '1', name: '单次' },{ id: '2', name: '按天' }]
 * key: id
 * return :  [ '1':  { text: '单次' },  '2': { text: '按天' }]
 */
export const transformSelect = (options: {[k: string]: any}[], key = 'id', name = 'name'): {[k: string | number]: any} => {
  const valueEnum: {[k: string | number]: any} = {};
  ArrayUtil.isNotEmpty(options) && options.forEach((i) => valueEnum[i[key]] = { text: i[name] });
  return valueEnum;
};

export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const getField = (item: Record<string | number, any>, path: string) => {
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

/**
 * 支持path路径
 * @param obj { a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }
 * @param format: {value: "a", label: "c.c1"}
 * @returns return : {value: "aa", label: "c11"}
 */
 export const omitFormat = (obj: any, format: Record<string, string>) => {
  const item = {};
  Object.keys(format).forEach((k) => {
    const v = format[k];
    item[k] = getField(obj, v);
  });
  return item;
};
