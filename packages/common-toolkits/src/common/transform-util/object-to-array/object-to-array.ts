import lodash, { isEmpty, isFunction } from "lodash";
import { ObjectType } from "../../types";

/**
 * 把 K V 结构的对象转换成数组
 * @param obj {1: 'a1', 2: 'b2}
 * @param customizer {key: 'id', value: 'name' }
 * @returns [{id: 1, name: 'a1'}, {id: 2, name: 'b2'}]
 */
const objectToArray = (obj: ObjectType, customizer: {key: string; value: string} | ((item: [string, any]) => ObjectType) = { key: 'id', value: 'name' }, keyType: 'int' | 'string' = 'string'): ObjectType[] => {
  if (isEmpty(obj)) return [] as ObjectType[];
  return Object.entries(obj).reduce((rs, next) => {
    if (isFunction(customizer)) {
      rs.push(customizer(next));
    } else {
      rs.push({ [customizer.key]: keyType === 'int' ? lodash.parseInt(next[0]) : next[0], [customizer.value]: next[1] });
    }
    return rs;
  }, [] as ObjectType[]);
};

export default objectToArray;
