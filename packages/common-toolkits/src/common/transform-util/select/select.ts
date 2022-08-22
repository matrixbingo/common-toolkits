import lodash, {isEmpty, isArray, isFunction, isObject } from 'lodash';
import { ObjectType } from '../../types';
import ObjectUtil from '../../object-util';
import ArrayUtil from '../../array-util';
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
  formatArray: <T extends ObjectType>(list: any[], customizer: Record<string, string> | ((item: any) => T)): T[] => {
    const rs: T[] = [];
    if (Array.isArray(list) && list.length > 0) {
      if (isFunction(customizer)) {
        return list.reduce((arr, next) => ArrayUtil.push<T>(arr, customizer(next)), rs) as T[];
      }
      return list.reduce((arr, next) => ArrayUtil.push<T>(arr as T[], select.formatObject<T>(next, customizer)), rs) as T[];
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

export default select;
