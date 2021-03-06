import lodash, { isObject, isEmpty, forEach, isNumber, isBoolean, isString, isArray, isFunction, has, get, set } from 'lodash';
import isJSON from '@stdlib/assert-is-json';
import isJSONObj from 'isjsonobj';
import { ObjectUtil, StringUtil } from '..';

const pattern = {
  BinENG: /^[a-zA-Z][a-zA-Z0-9_]*$/, // 英文开头
  JSON: /[^,:{}\\[\\]0-9.\-+Eaeflnr-u \n\r\t]/,
  int: /^(?:0|[1-9]\d*)$/,
  peInt: /^\+?[1-9]\d*$/, //正整数，不包含0
  neInt: /^-[1-9]\d*$/, //负整数，不包含0
  float: /^(-?\d+)(\.\d+)?$/,
};

// private
const toObject = ( obj: Record<string, string>, key: string, value: any ) => {
  if (obj && obj[key]) {
    return obj;
  }
  if (isFunction(value)) {
    obj[key] = value(obj[key]);
  } else {
    obj[key] = value;
  }
  return obj;
};

// private
const toFormat = (data: Record<string, string> | Array<Record<string, string>>, key: string, value: any ) => {
  if (Array.isArray(data)) {
    data.forEach((i) => toObject(i, key, value));
  } else if (isObject(data)) {
    toObject(data as Record<string, string>, key, value);
  }
};

/**
 * 针对返回值的管理, 不支持路径
 */
const result = {
  /**
   * 对查询结果缺失的部分设置默认值
   * @param data
   * @param format
   * @returns
   */
  setDefaultValue: (data: Record<string, string> | Array<Record<string, string>>, format: Record<string, any>): Record<string, string> | Array<Record<string, string>> => {
    const toObject = (obj: Record<string, string>, key: string, defaultValue: any) => {
      if (obj && obj[key]) {
        return obj;
      }
      if (isFunction(defaultValue)) {
        obj[key] = defaultValue(obj[key]);
      } else {
        obj[key] = defaultValue;
      }
      return obj;
    };

    const toFormat = (item: Record<string, string> | Array<Record<string, string>>, key: string, defaultValue: any) => {
      if (Array.isArray(data)) {
        data.forEach((i) => toObject(i, key, defaultValue));
      } else if (isObject(data)) {
        toObject(item as Record<string, string>, key, defaultValue);
      }
    };

    if (!isEmpty(format)) {
      Object.keys(format).forEach((key) => toFormat(data, key, format[key]));
    }
    return data;
  },
};

/**
 * 被clear调用，无需对外暴露
 * 清空无效的键值对
 * @param object
 * @param exclude 排除字段
 * @returns
 */
const cleanObject = (object: Record<any, any>, customizer: any[] | ((item: any) => boolean) = ['', undefined, null], exclude: string[] = []) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!exclude.includes(key)) {
      if (isArray(customizer)) {
        if ((customizer as any[]).includes(value)) {
          delete result[key];
        }
      } else if (isFunction(customizer)) {
        if (customizer(value)) {
          delete result[key];
        }
      }
    }
    if (isObject(value)) {
      result[key] = cleanObject(value, customizer, exclude);
    }
  });
  return result;
};

/**
 * 针对参数的管理
 */
const params = {
  /**
   * 给参数添加属性值
   * @param param
   * @param args
   * @returns
   */
  extends: ( param: Record<string | number, any>, args: { need?: (item: Record<string | number, any>) => boolean; item: Record<string | number, any> }[]): Record<string | number, any> => {
    return args.reduce((rs, next) => {
      if (next.need && next.need(next.item)) {
        forEach(next.item, (v, k) => {
          ObjectUtil.setField(param, k, v);
        });
      } else {
        forEach(next.item, (v, k) => {
          ObjectUtil.setField(param, k, v);
        });
      }
      return rs;
    }, param);
  },

  /**
   * 根据实际情况清空数组对象或对象的属性,默认清空
   * @param target
   * @param customizer
   * @param exclude
   * @returns
   */
  clear: (target: any, options: { customizer?: any[] | ((item: any) => boolean); exclude?: string[] } = { customizer: ['', undefined, null], exclude: [] }) => {
    if (isArray(target)) {
      target = Array.from(target);
      const rs = target.map((ele: any) => {
        if (isObject(ele)) {
          return cleanObject(ele, options.customizer, options.exclude);
        }
        return ele;
      });
      return rs;
    }
    if (isObject(target)) return cleanObject(target, options.customizer, options.exclude);
    return target;
  },
};

const unknown = {
  /**
   * 是否数字，包含字符串
   */
  isInt: (value: any): Boolean => {
    //! isNaN(parseInt(previous))
    const type = typeof value;
    return type === 'number' || (type !== 'symbol' && pattern.int.test(value));
  },

  /**
   * 正整数，不包含0
   */
  isPeInt: (value: any): Boolean => pattern.peInt.test(value),

  /**
   * 负整数，不包含0
   */
  isNeInt: (value: any): Boolean => pattern.neInt.test(value),

  isFloat: (value: any): Boolean => pattern.float.test(value),

  isJSON: (v: any) => isJSONObj(v) || isJSON(v),

  /**
   * select, checkbox, radio等转格式
   * @param value
   * @returns
   */
  parseValue: ( value: string | ReadonlyArray<string> | number ): number | string => {
    if (lodash.isNumber(value)) return value;
    if (lodash.isString(value) && unknown.isInt(value)) return parseInt(value, 10);
    return value.toString();
  },

  isVoid: (value: unknown) => value === undefined || value === null || value === '' || value === 'undefined' || value === 'null',

  isFalsy: (value: unknown) => (value === 0 ? false : !value),

  isValue: (value: any) => isNumber(value) || isBoolean(value) || isString(value) || isObject(value) || isArray(value) || !!value,

  /**
   * 判断字符串是否是十六进制的颜色值
   * @param value
   */
  isColor: (value: string): boolean => /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value),
};

const tree = {
  /**
   * 树形结构里搜索
   * @param array
   * @param children
   * @param customizer
   * @returns
   */
  filter: ( array: any[], children = 'children', customizer = (object: { text: string }) => object.text === '' ) => {
    const getNodes = ( result: any[], object: { text: string; [x: string]: any } ) => {
      if (customizer(object)) {
        result.push(object);
        return result;
      }
      if (Array.isArray(object[children])) {
        const nodes = object[children].reduce(getNodes, []);
        if (nodes.length) result.push({ ...object, children: nodes });
      }
      return result;
    };
    return array.reduce(getNodes, []);
  },
  getMaxlevel: (treeData: any, children = 'children') => {
    let maxLevel = 0;
    function loop(data: any[], level: number) {
      data.length > 0 &&
        data.forEach((item: { [x: string]: any; level: any }) => {
          item.level = level;
          if (level > maxLevel) {
            maxLevel = level;
          }
          if (children in item) {
            if (item[children].length > 0) {
              loop(item[children], level + 1);
            }
          }
        });
    }
    loop(treeData, 1);
    return maxLevel;
  },

  /**
   * 从树形结构中去对应的值
   * @param arr
   * @param children
   * @param key
   * @param list
   * @param filter
   * @returns
   */
  valuesFromTree: (arr: any[], children = 'children', key = 'key', list: any[] = [], filter: (item: any) => boolean = () => true) => {
    arr.forEach((i) => {
      if (has(i, key) && filter(i)) {
        list.push(get(i, key));
      }
      const childrens = get(i, children);
      if (isArray(childrens)) {
        tree.valuesFromTree(childrens, children, key, list);
      }
    });
    return list;
  },

  /**
   * 从树形结构中获取键值对
   * @param arr
   * @param children
   * @param key
   * @param list
   * @param filter
   * @returns
   */
  keyValuesFromTree: (arr: any[], children = 'children', key = 'key', value = 'value', obj: any = {}, filter: (item: any) => boolean = () => true) => {
    arr.forEach((i) => {
      if (has(i, key) && has(i, value) && filter(i)) {
        set(obj, get(i, key), get(i, value));
      }
      const childrens = get(i, children);
      if (isArray(childrens)) {
        tree.keyValuesFromTree(childrens, children, key, value, obj);
      }
    });
    return obj;
  },
};

const input = {
  /**
   * 取字符串int部分
   */
  getInt: (val: string | number) => {
    if (val === '0' || val === 0) return val;
    if (isEmpty(val)) return '';
    if (!unknown.isInt(val)) {
      val = (val as string).replace(/[^0-9]/gi, '');
      if (!unknown.isInt(val)) {
        return '';
      }
    }
    return parseInt(val as string, 10);
  },
  /**
   * 取字符串float部分
   */
  getFloat: (val: string) => {
    if (val === '0.') return val;
    if (val === '0') return parseFloat(val);
    if (isEmpty(val) || val === '.') {
      return '';
    }
    if (!unknown.isFloat(val)) {
      if (val.includes('.')) {
        const arr = val.split('.');
        if (arr.length > 1) {
          const a = input.getInt(arr[0]);
          if (isEmpty(val)) {
            return '';
          }
          if (unknown.isInt(a)) {
            return String(`${a}.${input.getInt(arr[1])}`);
          }
        }
      } else {
        const a = input.getInt(val);
        if (unknown.isInt(a)) {
          return a;
        }
        return '';
      }
    }
    return parseFloat(val);
  },
};

/**
 * 生成32位uuid
 * @returns string
 */
const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

/**
 * 乘以100, 添加百分号
 */
const initRate = (rate: string | number, multiply = 100, percent = '%'): string => {
  const value = input.getFloat(String(rate));
  if (isNumber(value)) return (value * multiply) + percent;
  return '0';
};


export default {
  pattern, result, unknown, tree, input, params, uuid
} as const;
