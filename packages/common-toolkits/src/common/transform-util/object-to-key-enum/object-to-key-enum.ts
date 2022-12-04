import { set } from "lodash";
import { ObjectType } from "../../types";

/**
 * @param obj
 * @returns
 */
const objectToKeyEnum = <T extends ObjectType>(obj: T): Record<keyof T, keyof T> => {
  return Object.keys(obj).reduce((rs, next) => {
    set(rs, [next], next);
    return rs;
  }, {} as any);
};

export default objectToKeyEnum;
