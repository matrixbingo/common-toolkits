import { isObject, forEach, isArray, isFunction } from 'lodash';
import ObjectUtil from '../../object-util';

/**
 * 被clear调用，无需对外暴露
 * 清空无效的键值对
 * @param object
 * @param exclude 排除字段
 * @returns
 */
const cleanObject = (object: Record<any, any>, customizer: any[] | ((item: any) => boolean) = ['', undefined, null], exclude: string[] = []) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!exclude.includes(key)) {
      if (isArray(customizer)) {
        if ((customizer as any[]).includes(value)) {
          delete result[key];
        }
      } else if (isFunction(customizer)) {
        if (customizer(value)) {
          delete result[key];
        }
      }
    }
    if (isObject(value)) {
      result[key] = cleanObject(value, customizer, exclude);
    }
  });
  return result;
};

/**
 * 针对参数的管理
 */
const params = {
  /**
   * 给参数添加属性值
   * @param param
   * @param args
   * @returns
   */
  extends: ( param: Record<string | number, any>, args: { need?: (item: Record<string | number, any>) => boolean; item: Record<string | number, any> }[]): Record<string | number, any> => {
    return args.reduce((rs, next) => {
      if (next.need && next.need(next.item)) {
        forEach(next.item, (v, k) => {
          ObjectUtil.setField(param, k, v);
        });
      } else {
        forEach(next.item, (v, k) => {
          ObjectUtil.setField(param, k, v);
        });
      }
      return rs;
    }, param);
  },

  /**
   * 根据实际情况清空数组对象或对象的属性,默认清空
   * @param target
   * @param customizer
   * @param exclude
   * @returns
   */
  clear: (target: any, options: { customizer?: any[] | ((item: any) => boolean); exclude?: string[] } = { customizer: ['', undefined, null], exclude: [] }) => {
    if (isArray(target)) {
      target = Array.from(target);
      const rs = target.map((ele: any) => {
        if (isObject(ele)) {
          return cleanObject(ele, options.customizer, options.exclude);
        }
        return ele;
      });
      return rs;
    }
    if (isObject(target)) return cleanObject(target, options.customizer, options.exclude);
    return target;
  },
};

export default params;
