import splitToNumberArray from "../split-to-number-array/split-to-number-array";
import unique from '../../array-util/unique/unique';
import { isEmpty } from "lodash";
/**
 * 字符串转数组,去重，默认排序
 * @param input
 * @param key
 */
const splitToNumberArrayUniqueSort = (input: string, key = ','): number[] => {
  const arr = splitToNumberArray(input, key);
  if (isEmpty(arr)) {
    return [];
  }
  return unique<number>(arr).sort();
};

export default splitToNumberArrayUniqueSort;
