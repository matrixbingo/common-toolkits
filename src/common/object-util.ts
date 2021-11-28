/* eslint-disable no-return-assign */
import lodash, { isArray, isEmpty, isObject, isString } from 'lodash';
import * as ArrayUtil from './array-util';
import Immutable from 'immutable';

export type ObjectType = Record<number|string, unknown> | object;

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

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

/** *
   * JSON 格式转换 select等组件用
   * objs: [{type: '1', tag:'aa'}, {type: '2', tag:'bb'}] 或 {1:aa, 2:bb}
   * formJson: {id: 'type', name: 'tag'}
   * return : [{id: '1', name:'aa'}, {id: '2', name:'bb'}]
   */
export const transformJson = (objs: ObjectType, formJson: Record<string, string>) => {
  const rs: any[] = [];
  if (isArray(objs)) {
    for (let i = 0; i < objs.length; i++) {
      const obj = objs[i];
      const item = {};
      lodash.forIn(formJson, (v, k) => {
        item[k] = obj[v];
      });
      rs.push(item);
    }
    return rs;
  } if (isObject(objs)) {
    lodash.forIn(objs, (value, key) => {
      const item = {};
      lodash.forIn(formJson, (v, k) => {
        if (k === 'id') {
          item[v] = key;
        } else if (k === 'name') {
          item[v] = value;
        }
      });
      rs.push(item);
    });
    return rs;
  }
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
