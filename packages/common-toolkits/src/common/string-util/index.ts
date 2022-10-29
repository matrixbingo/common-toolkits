import splitByComma from './split-by-comma/split-by-comma';
import splitToNumberArrayUniqueSort from './split-to-number-array-unique-sort/split-to-number-array-unique-sort';
import splitToNumberArray from './split-to-number-array/split-to-number-array';
import toArrayBySeparator from './to-array-by-separator/to-array-by-separator';
import truncate from './truncate/truncate';
import firstToUpper from "./first-to-upper/first-to-upper";

export default {
  splitByComma,
  splitToNumberArray,
  splitToNumberArrayUniqueSort,
  toArrayBySeparator,
  truncate,
  firstToUpper,
} as const;
