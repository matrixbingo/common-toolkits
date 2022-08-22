import {isFunction, mapKeys } from 'lodash';

/**
 * @param obj
 * @param customizer 如果是function则默认lodash，如果是object，则key值转换
 * @returns
 */
const objectMapKeys = ( obj: object, customizer: object | ((value: any, key: any) => any) ): object => {
  if (isFunction(customizer)) return mapKeys(obj, customizer);
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [customizer[k] || k, v]) );
};

export default objectMapKeys;
