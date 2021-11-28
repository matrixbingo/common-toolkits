import { isArray, isEmpty } from 'lodash';

export const push = (arr: any[], ele: any) => {
  if (arr.indexOf(ele) === -1) {
    arr.push(ele);
  }
};

export const pushByIndex = (arr: { [x: string]: any[]}, index: string | number, item: string) => {
  item = isEmpty(item) || item === 'undefined' || item === 'null' ? '' : item;
  if (isEmpty(arr[index])) {
    arr[index] = [];
    arr[index].push(item);
  } else if (isArray(arr[index])) {
    arr[index].push(item);
  }
};

export const remove = (arr: any[], val: any) => {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

export const unique = (arr: any): any[] => {
  return [...new Set(arr)];
};

export const uniqueSort = (arr: any): any[] => {
  return unique(arr).sort();
};
export const removeObjByKey = (arr: { [K: string]: unknown }[] = [], item: { [K: string]: string | number }, K = 'id') => {
  return arr.filter((i) => i[K] !== item[K]);
};

export const mapByKey = (list: { [K: string]: any }[], k = 'id') => {
  return list.map((i) => i[k]);
};

export const equals = (arr: string | any[], target: string | any[]) => {
  // if the other array is a falsy value, return
  if (!target) return false;

  // compare lengths - can save a lot of time
  if (arr.length !== target.length) return false;

  for (let i = 0, l = arr.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr[i] instanceof Array && target[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arr[i].equals(target[i])) return false;
    } else if (arr[i] !== target[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

export const isNotEmpty = (arr: any): boolean => {
  return arr && !isEmpty(arr) && arr?.length > 0;
};
