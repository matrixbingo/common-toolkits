import lodash, { isObject, isEmpty, forEach } from 'lodash';
import isJSON from '@stdlib/assert-is-json';
import isJSONObj from 'isjsonobj';
import { ObjectUtil } from '..';

export type Raw = string | number;

export type ObjectType = Record<Raw, any>;

export type ObjectTypeArray = Record<Raw, any>[];

const pattern = {
  BinENG: /^[a-zA-Z][a-zA-Z0-9_]*$/,                  // 英文开头
  JSON: /[^,:{}\\[\\]0-9.\-+Eaeflnr-u \n\r\t]/,
  int: /^(?:0|[1-9]\d*)$/,
  peInt: /^\+?[1-9]\d*$/,                             //正整数，不包含0
  neInt: /^-[1-9]\d*$/,                               //负整数，不包含0
  float: /^(-?\d+)(\.\d+)?$/,
  
};

const isVoid =  (value: unknown) => value === undefined || value === null || value === '' || value === 'undefined' || value === 'null';

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

const result = {
  /**
   * 设置默认值
   * @param data 
   * @param format 
   * @returns 
   */
  setDefaultValue: (data: Record<string, string> | Array<Record<string, string>>, format: Record<string, any>): Record<string, string> | Array<Record<string, string>> => {
    const toObject = (obj: Record<string, string>, key: string, defaultValue: any) => {
      if (obj && obj[key]) {
        return obj;
      }
      obj[key] = defaultValue;
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
}

const params = {
  /**
   * 给参数添加属性值
   * @param param 
   * @param args 
   * @returns 
   */
  extends: (param: Record<string|number, any>, args: { customizer: (item: Record<string| number, any>) => boolean, item: Record<string| number, any> }[]): Record<string| number, any> => {
    return args.reduce((rs, next) => {
      if(next.customizer(next.item)) {
        forEach(next.item, (v, k) => {
          ObjectUtil.setField(param, k, v);
        })
      }
      return rs;
    }, param)
  }
};

const unknown = {
  /**
   * 包含字符串
   */
  isInt: (value: any): Boolean => {  //! isNaN(parseInt(previous))
    const type = typeof value
    return type === 'number' || (type !== 'symbol' && pattern.int.test(value)) 
  },

  /**
   * 正整数，不包含0
   */
  isPeInt: (value: any): Boolean =>  pattern.peInt.test(value),

  /**
   * 负整数，不包含0
   */
  isNeInt: (value: any): Boolean =>  pattern.neInt.test(value),

  isFloat: (value: any): Boolean =>  pattern.float.test(value),

  isJSON: (v: any) => isJSONObj(v) || isJSON(v),
  
  /**
   * select, checkbox, radio等转格式
   * @param value
   * @returns
   */
  parseValue: (value: string | ReadonlyArray<string> | number): number |string => {
    if (lodash.isNumber(value)) return value;
    if (lodash.isString(value) && unknown.isInt(value)) return parseInt(value, 10);
    return value.toString();
  },
};

const tree = {
  filter: (array: any[], children = 'children', customizer = (object: { text: string }) => object.text === '') => {
    const getNodes = (result: any[], object: { text: string; [x: string]: any }) => {
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
      data.length > 0 && data.forEach((item: { [x: string]: any; level: any }) => {
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
};

const input = {
  /**
   * 取字符串int部分
   */
  getInt : (val: string | number) => {
    if (val === '0' || val === 0) return val;
    if (isEmpty(val)) return '';
    if (!unknown.isInt(val)) {
      val = (val as string).replace(/[^0-9]/ig, '');
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
          } if (unknown.isInt(a)) {
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
  }
}

export default {
  pattern,
  isVoid,
  isFalsy,
  result,
  unknown,
  tree,
  input,
  params
};