import mapKeys from './map-keys/map-keys';
import objectMapKeys from './object-map-keys/object-map-keys';
import nullToString from './null-to-string/null-to-string';
import numberArrToStringArr from './number-arr-to-string-arr/number-arr-to-string-arr';
import stringArrToNumberArr from './string-arr-to-number-arr/string-arr-to-number-arr';
import select from './select/select';
import toArrByPath from './to-arr-by-path/to-arr-by-path';
import toArrByPathUnique from './to-arr-by-path-unique/to-arr-by-path-unique';
import toArrByPaths from './to-arr-by-paths/to-arr-by-paths';
import objectToArray from './object-to-array/object-to-array';
import objecToValueEnum from './objec-to-value-enum/objec-to-value-enum';
import arrayToObject from './array-to-object/array-to-object';

/**
 * TODO 操作
 */
const options = {};

export default {
  arrayToObject, mapKeys, nullToString, numberArrToStringArr, objectMapKeys, objectToArray, objecToValueEnum, options, select, stringArrToNumberArr, toArrByPath, toArrByPathUnique, toArrByPaths,
} as const;

