import { forIn, isArray, isObject } from 'lodash';
import ObjectUtil from './object-util';
import ArrayUtil from './array-util';

export type Raw = string | number;

export type ObjectType = Record<Raw, any>;

export type ObjectTypeArray = Record<Raw, any>[];

type SelectValueType = string | string[] | number | number[];

type SelectType = {value: SelectValueType, label: Raw | any};

type SelectDataSourceType = SelectType[];

/**
 * 支持path路径
 * @param obj { a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }
 * @param format: {value: "a", label: "c.c1"}
 * @returns {value: "aa", label: "c11"}
 */
const omitFormat = (obj: Record<string, string>, format: Record<string, string>): any => {
  const item = {} as Record<string, string>;
  Object.keys(format).forEach((k) => {
    const v = format[k];
    item[k] = ObjectUtil.getField(obj, v);
  });
  return item;
};

/**
 * to SelectDataSourceType
 */
const select = {
  /**
   * JSON 格式转换 select等组件用, TODO 支持path路径
   * @param list  [{ a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }, { a: "AA", b: "BB", c: { c1: "C11", c2: "C12" } }]
   * @param format {value: "a", label: "c.c1"}
   * @returns [ {value: 'aa', label: 'c11'}, {value: 'AA', label: 'C11'} ]
   */
  formatArray: (list: any[],  format: Record<string, string>): SelectDataSourceType => {
    const rs: SelectDataSourceType = [];
    if (Array.isArray(list) && list.length > 0) {
      return list.reduce((arr, next) => ArrayUtil.push(arr, omitFormat(next, format)), rs);
    }
    return rs;
  },
  /**
    * JSON 格式转换 select等组件用, TODO 支持path路径
    * @param obj  {a: "aa", b: "bb"}
    * @param format {value: "label"}
    * @returns 
    */
  formatObject: (obj: Record<string, string>,  format: Record<string, string>): SelectDataSourceType => {
    const item = {k: '', v: ''};
    forIn(format, (value, key) => {
      item.k = key;
      item.v = value;
    });
    const rs: SelectDataSourceType = [];
    if(isObject(obj)){
      Object.keys(obj).forEach((k)=>{
        const o: any = {};
        o[item.k] = k;
        o[item.v] = obj[k];
        rs.push(o);
      });
    };
    return rs;
  },
  /** *
   * JSON 格式转换 select等组件用
   */
  formatArrayAndObject : (objs: any, format: Record<string, string>): SelectDataSourceType => {
    return Array.isArray(objs)? select.formatArray(objs, format) : select.formatObject(objs, format);
  },
};

/**
 * 获取指定键生成数组，select all等使用, key支持path
 * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @path id
 * @returns ['a1', 'a2']
 */
const toArrByPath = (arr: any[], path: string): any[] => {
  return arr.reduce((list, next) => ArrayUtil.push(list, ObjectUtil.getField(next, path)), []);
};

/**
 * 与toArrByPath类似，依赖toArrByPath,输出多组
 * @param arr  [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @param Paths ['id', 'name']
 * @returns {id:['a1', 'a2'], name:['n1', 'n2']}
 */
const  toArrByPaths = (arr: any[], paths: string[]): any => {
  return paths.reduce((rs, path) => {
    rs[path] = toArrByPath(arr, path);
    return rs;
  }, {} as any);
};

/**
 * options : [{ id: '1', name: '单次' },{ id: '2', name: '按天' }]
 * key: id
 * return :  [ '1':  { text: '单次' },  '2': { text: '按天' }]
 */
const transformSelect = (options: {[k: string]: any}[], key = 'id', name = 'name'): {[k: string | number]: any} => {
  const valueEnum: {[k: string | number]: any} = {};
  ArrayUtil.isNotEmpty(options) && options.forEach((i) => valueEnum[i[key]] = { text: i[name] });
  return valueEnum;
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

/**
 * TODO 操作
 */
const options = {};

export default {
  omitFormat,
  select,
  toArrByPath,
  toArrByPaths,
  transformSelect,
  nullToString,
  options,
};
