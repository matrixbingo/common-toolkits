/* eslint-disable no-return-assign */
import lodash, { cloneDeep, isArray, isFunction, isObject, isString, set } from 'lodash';
import Immutable from 'immutable';
import ArrayUtil from './array-util';
import TypeUtil from './type-util';
import { ObjectType } from './types';

// TODO 可替换
const equals = (a: Array<any> | ObjectType, b: Array<any> | ObjectType) => {
  return Immutable.is(Immutable.fromJS(a), Immutable.fromJS(b));
};

/**
 * 判断key在object内
 * @param key
 * @param object
 * @returns
 */
const isValidKey = ( key: string | number | symbol, object: object ): key is keyof typeof object => {
  return key in object;
}

/**
 * 给目标对象添加属性，如果没有则创建
 * @param target {a:1}
 * @param key 'a'
 * @param value c
 * @returns
 */
const setValue = (target: Record<string, any> | any[], key: string, value: any ): Record<any, any> => {
  if (!target || !key) return { key: value };
  if (key === '__proto__') {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true,
    });
  } else {
    if (target[key]) window.console.warn('值被替换:', target, key, value);
    if (isObject(target)) {
      target[key] = value;
    } else if (isArray(target) && TypeUtil.isInt(key)) {
      (target as any[])[Number(key)] = value;
    }
  }
  return target;
};

/**
 * 路径取值
 * @param item {a:[{b:1}]}
 * @param path a.0.b
 * @returns 1
 */
const getField = ( item: Record<string | number, any> | string, path: string ) => {
  if (isString(item) || !item || !path) return item;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    try {
      if (keys.length === 1) return item[path];
      return keys.reduce(
        (obj, key) => obj[TypeUtil.parseValue(key)],
        item,
      );
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
const setField = (target: Record<any, any>, path: string, value: any) => {
  if (isString(target) || !target || !path) return target;
  if (path.includes('.')) {
    const keys: string[] = path.split('.');
    if (keys.length === 1) return setValue(target, path, value);
    try {
      const rs = keys.reduce((arr, next) => {
        if(TypeUtil.isInt(next)){
          arr.push({key: '[' + next +']', type: 'int'});
        }else{
          arr.push({key: next, type: 'string'});
        }
        return arr;
      }, [] as any[]);

      const length = rs.length;
      let path = '';
      rs.forEach((v, i) => {
        if (i === 0){
          path = v.key;
        } else if (i < length){
          if (v.type === 'int'){
            path += v.key;
          } else if (v.type === 'string'){
            path += '.' + v.key;
          }
        }
      });
      set(target, path, value);
    } catch (e) {
      console.warn('ObjectUtil.setField', value, path, e);
    }
  } else {
    setValue(target, path, value);
  }
  return target;
};

const setFields = (object: object, data: ObjectType) => {
  Object.entries(data).forEach((v) => {
    set(object, v[0], v[1]);
  });
};

/**
 * obj中是否存在value
 * @param obj
 * @param paths
 */
const some = ( obj: Record<any, any>, paths: string[] | ((val: any) => boolean), value?: any ): boolean => {
  if (obj === null || !ArrayUtil.isNotEmpty(paths)) return false;
  if (isArray(paths)) {
    return paths.some((path) => getField(obj, path) === value);
  }
  if (isFunction(paths)) {
    return Object.keys(obj).some((key) => paths(obj[key]));
  }
  return false;
};

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

/**
 * 遍历对象，value去空格或指定字符
 */
const trim = <T extends ObjectType | ObjectType[]>( data: T, chars?: string ): T => {
  const objTrim = (item: ObjectType) => {
    Object.keys(item).forEach((v, k) => {
      if (isString(v)) {
        item[k] = lodash.trim(v, chars);
      } else if (isObject(v)) {
        objTrim(v);
      } else if (isArray(v)) {
        arrTrim(v);
      }
    });
  };

  const arrTrim = (arr: any[]) => {
    arr.forEach((ele, i) => {
      if (isString(ele)) {
        arr[i] = lodash.trim(ele, chars);
      } else if (isObject(ele)) {
        objTrim(ele);
      } else if (isArray(ele)) {
        arrTrim(ele);
      }
    });
  };

  if (isArray(data)) {
    arrTrim(data);
  } else if (isObject(data)) {
    objTrim(data);
  }

  return data;
};


export default {
  equals, getField, isValidKey, omit, pick, setField, some, trim,
} as const;
