import { isFunction } from "lodash";
import { ObjectType } from "../../types";

/**
 * proComponents, proTable 常用
 * @param obj
 * @param customizer
 * @returns
 */
const objecToValueEnum = (obj: ObjectType, customizer: {key: string; value: string} | ((item: [string, any]) => any) = { key: 'id', value: 'text' }): any => {
  return Object.entries(obj).reduce((rs, next) => {
    if (isFunction(customizer)) {
      rs[next[0]] = customizer(next);
    } else {
      rs[next[0]] = { text: next[1] };
    }
    return rs;
  }, {} as any);
};

export default objecToValueEnum;
