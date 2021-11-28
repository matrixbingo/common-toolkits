import lodash, { isObject, isEmpty } from 'lodash';
import isJSON from '@stdlib/assert-is-json';
import isJSONObj from 'isjsonobj';
import { isInt } from './string-util';

const DataUtil = {

  result: {
    format: (data: Record<string, string> | Array<Record<string, string>>, format: Record<string, any>): Record<string, string> | Array<Record<string, string>> => {
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
  },

  unknown: {
    /**
     * select, checkbox, radio等转格式
     * @param value
     * @returns
     */
    parseValue: (value: string | ReadonlyArray<string> | number): number |string => {
      if (lodash.isNumber(value)) {
        return value;
      }
      if (lodash.isString(value) && isInt(value)) {
        return parseInt(value, 10);
      }
      return value.toString();
    },
  },
  pattern: {
    BinENG: '^[a-zA-Z][a-zA-Z0-9_]*$', // 英文开头
    JSON: '/[^,:{}\\[\\]0-9.\-+Eaeflnr-u \n\r\t]/',
  },
  type: {
    isJSON: (v: any) => {
      return isJSONObj(v) || isJSON(v);
    },
  },
  tree: {
    filter: (array: any[], children = 'children', func = (object: { text: string }) => object.text === '') => {
      const getNodes = (result: any[], object: { text: string; [x: string]: any }) => {
        if (func(object)) {
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
  },

};

export default DataUtil;
