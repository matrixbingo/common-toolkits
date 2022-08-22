import lodash, { isArray, isObject, isString } from 'lodash';
import { ObjectType } from '../../types';

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

export default trim;
