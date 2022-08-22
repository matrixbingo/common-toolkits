import { isArray, isObject } from 'lodash';
import TypeUtil from '../../type-util';

/**
 * 给目标对象添加属性，如果没有则创建
 * @param target {a:1}
 * @param key 'a'
 * @param value c
 * @returns
 */
const setValue = (target: Record<string, any> | any[], key: string, value: any ): Record<any, any> => {
  if (!target || !key) return { key: value };
  if (key === '__proto__') {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true,
    });
  } else {
    if (target[key]) window.console.warn('值被替换:', target, key, value);
    if (isObject(target)) {
      target[key] = value;
    } else if (isArray(target) && TypeUtil.isInt(key)) {
      (target as any[])[Number(key)] = value;
    }
  }
  return target;
};

export default setValue;
