import lodash, {isEmpty, isArray, isFunction, isObject } from 'lodash';
import ObjectUtil from './object-util';
import ArrayUtil from './array-util';
import { ObjectType } from './types';

const mapKeys = <T extends object | object[]>(target: T, customizer: object | ((value: any, key: any) => any) ): T => {
  if(isArray(<object[]>target)){
      return (<object[]>target).map((ele: Record<any, any>) => {
        if (isObject(ele)) {
          return objectMapKeys(ele, customizer);
        }
        return ele;
      }) as T;
  } else if(isObject(target)) {
    return objectMapKeys(target, customizer) as T;
  }
  return target;
};

/**
 * @param obj
 * @param customizer 如果是function则默认lodash，如果是object，则key值转换
 * @returns
 */
const objectMapKeys = ( obj: object, customizer: object | ((value: any, key: any) => any) ): object => {
  if (isFunction(customizer)) return lodash.mapKeys(obj, customizer);
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [customizer[k] || k, v]) );
};

/**
 * 递归对象,或数组 null转为''
 * @param data
 * @returns
 */
const nullToString = (data: Record<string, any> | Record<string, any>[]) => {
  if (isObject(data)) {
    // Object.entries(data).forEach(([key, value]) => {
    //   if (data[key] === null) {
    //     data[key] = '';
    //   } else {
    //     if (Array.isArray(data[key])) {
    //       data[key] = data[key].map((z: any) => {
    //         return nullToString(z);
    //       });
    //     }
    //     if (isObject(data[key])) {
    //       data[key] = nullToString(data[key]);
    //     }
    //   }
    // });
  } else if (isArray(data)) {
      (data as Array<any>)?.forEach((item) => nullToString(item));
  }
  return data;
};

const numberArrToStringArr = (arr: number[]): string[] => arr.map((i) => String(i));

const stringArrToMumberArr = (arr: string[]): number[] => arr.map((i) => Number(i));



/**
 * TODO 操作
 */
const options = {};

/**
 * to SelectDataSourceType
 */
const select = {

  /**
   * 把 K V 结构的对象转换成数组
   * @param obj {1: 'a1', 2: 'b2}
   * @param customizer {key: 'id', value: 'name' }
   * @returns [{id: 1, name: 'a1'}, {id: 2, name: 'b2'}]
   */
  objectToArray: (obj: ObjectType, customizer: {key: string; value: string} | ((item: [string, any]) => ObjectType) = { key: 'id', value: 'name' }): ObjectType[] => {
    if (isEmpty(obj)) return [] as ObjectType[];
    return Object.entries(obj).reduce((rs, next) => {
      if (isFunction(customizer)) {
        rs.push((customizer as (item: [string, any]) => ObjectType)?.(next));
      } else {
        rs.push({ [(customizer as {key: string; value: string})?.key]: next[0], [(customizer as {key: string; value: string})?.value]: next[1]  });
      }
      return rs;
    }, [] as ObjectType[]);
  },

  /**
   * 支持path路径，
   * @param obj { a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }
   * @param format: {value: "a", label: "c.c1"}
   * @returns {value: "aa", label: "c11"}
   */
  formatObject: <T extends ObjectType>(obj: ObjectType, format: Record<string, string>): T => {
    const item = {} as ObjectType;
    Object.keys(format).forEach((k) => {
      const v = format[k];
      item[k] = ObjectUtil.getField(obj, v);
    });
    return item as T;
  },

  /**
   * JSON 格式转换 select等组件用
   * @param list  [{ a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }, { a: "AA", b: "BB", c: { c1: "C11", c2: "C12" } }]
   * @param format {value: "a", label: "c.c1"}
   * @returns [ {value: 'aa', label: 'c11'}, {value: 'AA', label: 'C11'} ]
   */
  formatArray: <T extends ObjectType>(list: ObjectType[],  format: Record<string, string>): T[] => {
    const rs: T[] = [];
    if (Array.isArray(list) && list.length > 0) {
      return list.reduce((arr, next) => ArrayUtil.push<T>(arr as T[], select.formatObject<T>(next, format)), rs) as T[];
    }
    return rs;
  },

  /** *
   * JSON 格式转换 select等组件用
   */
  formatArrayOrObject :<T>(objs: any, format: Record<string, string>): T | T[] => Array.isArray(objs)? select.formatArray(objs, format) : select.formatObject(objs, format),

  /**
   * options : [{ id: '1', name: 'aa' },{ id: '2', name: 'bb' }]
   * key: id, name
   * return :  [ '1':  { text: 'aa' },  '2': { text: 'bb' }]
   */
  transformSelect: (options: {[k: string]: any}[], key = 'id', name = 'name'): {[k: string | number]: any} => {
    const valueEnum: {[k: string | number]: any} = {};
    ArrayUtil.isNotEmpty(options) && options.forEach((i) => valueEnum[i[key]] = { text: i[name] });
    return valueEnum;
  },
};

const toArrByPath = (arr: any[], path: string): any[] => arr.reduce((list, next) => {
  list.push(ObjectUtil.getField(next, path));
  return list;
}, [] as any[]);

/**
 * 获取指定键生成数组，select all等使用, key支持path
 * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @path id
 * @returns ['a1', 'a2']
 */
const toArrByPathUnique = (arr: any[], path: string): any[] =>  arr.reduce((list, next) => ArrayUtil.push(list, ObjectUtil.getField(next, path)), []);

/**
 * 与toArrByPath类似，依赖toArrByPath,输出多组
 * @param arr  [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @param Paths ['id', 'name']
 * @returns {id:['a1', 'a2'], name:['n1', 'n2']}
 */
const toArrByPaths = (arr: any[], paths: string[]): any => {
  return paths.reduce((rs, path) => {
    rs[path] = toArrByPath(arr, path);
    return rs;
  }, {} as any);
};
/**
 * 把 K V 结构的对象转换成数组
 * @param obj {1: 'a1', 2: 'b2}
 * @param customizer {key: 'id', value: 'name' }
 * @returns [{id: 1, name: 'a1'}, {id: 2, name: 'b2'}]
 */
const objectToArray = (obj: ObjectType, customizer: {key: string; value: string} | ((item: [string, any]) => ObjectType) = { key: 'id', value: 'name' }, keyType: 'int' | 'string' = 'string'): ObjectType[] => {
  if (isEmpty(obj)) return [] as ObjectType[];
  return Object.entries(obj).reduce((rs, next) => {
    if (isFunction(customizer)) {
      rs.push(customizer(next));
    } else {
      rs.push({ [customizer.key]: keyType === 'int' ? lodash.parseInt(next[0]) : next[0], [customizer.value]: next[1] });
    }
    return rs;
  }, [] as ObjectType[]);
};

/**
 * proComponents, proTable 常用
 * @param obj 
 * @param customizer 
 * @returns 
 */
const objecToValueEnum = (obj: ObjectType, customizer: {key: string; value: string} | ((item: [string, any]) => any) = { key: 'id', value: 'text' }): any => {
  return Object.entries(obj).reduce((rs, next) => {
    if (isFunction(customizer)) {
      rs[next[0]] = customizer(next);
    } else {
      rs[next[0]] = { text: next[1] };
    }
    return rs;
  }, {});
};

export default {
  mapKeys, nullToString, numberArrToStringArr, objectMapKeys, objectToArray, objecToValueEnum, options, select, stringArrToMumberArr, toArrByPath, toArrByPathUnique, toArrByPaths,
} as const;

