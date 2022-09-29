import lodash, { isEmpty, isFunction } from "lodash";
import { ObjectType } from "../../types";

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
