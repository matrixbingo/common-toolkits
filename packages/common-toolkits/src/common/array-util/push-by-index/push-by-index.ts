import { isArray, isObject } from 'lodash';
import assign from '../assign/assign';

/**
 * 向指定index添加值
 * @param arr [{a:['a']}, {b:['b']}, ['v', '2']]
 * @param index 1
 * @param item c
 * @returns  [{a:['a']}, {b:['b', 'c']}]
 */
const pushByIndex = ( arr: ({ [x: string]: any[] } | any[])[], index: number, item: any ): ({ [x: string]: any[] } | any[])[] => {
  if (index > arr.length - 1) {
    arr[index] = [item];
    return arr;
  }
  const ele = arr[index];
  if (isArray(ele)) {
    (<any[]>ele).push(item);
  } else if (isObject(ele)) {
    Object.entries(ele).forEach((kv) => {
      if(isArray(kv[1])){
        kv[1].push(item);
      } else if (isObject(kv[1])) {
        assign(kv[1], item);
      }
    })
  }
  return arr;
};

export default pushByIndex;
