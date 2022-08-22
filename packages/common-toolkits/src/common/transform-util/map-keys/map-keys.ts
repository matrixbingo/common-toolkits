import {isArray, isObject } from 'lodash';
import objectMapKeys from '../object-map-keys/object-map-keys';

const mapKeys = <T extends object | object[]>(target: T, customizer: object | ((value: any, key: any) => any) ): T => {
  if(isArray(<object[]>target)){
      return (<object[]>target).map((ele: Record<any, any>) => {
        if (isObject(ele)) {
          return objectMapKeys(ele, customizer);
        }
        return ele;
      }) as T;
  } else if(isObject(target)) {
    return objectMapKeys(target, customizer) as T;
  }
  return target;
};

export default mapKeys;
