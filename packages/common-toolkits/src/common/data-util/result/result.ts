import { isObject, isEmpty, isFunction } from 'lodash';

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

export default result;
