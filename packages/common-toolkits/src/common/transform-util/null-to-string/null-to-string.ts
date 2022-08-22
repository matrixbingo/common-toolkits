import {isArray, isObject } from 'lodash';

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

export default nullToString;
