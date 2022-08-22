import { isEmpty } from "lodash";
import splitByComma from "../split-by-comma/split-by-comma";

/**
 * 字符串转数组,支持中英文标点 1，2，3，4 =>[1,2,3,4]
 * @param input
 * @param key
 */
const splitToNumberArray = (input: string, key = ','): number[] => {
  if (isEmpty(input)) {
    return [];
  }
  if (key === ',') {
    return splitByComma(input)?.map((v) => parseInt(v, 10));
  }
  return input?.split(key)?.map((v) => parseInt(v, 10));
};

export default splitToNumberArray;
