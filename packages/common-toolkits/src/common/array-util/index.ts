import pushArray from './push-array/push-array';
import addProps from './add-props/add-props';
import assign from './assign/assign';
import filterItemByPath from './filter-item-by-path/filter-item-by-path';
import filterItemListByPaths from './filter-item-by-path/filter-item-by-paths';
import includes from './includes/includes';
import initArray from './init-array/init-array';
import isNotEmpty from './is-not-empty/is-not-empty';
import mapByKey from './map-by-key/map-by-key';
import merge from './merge/merge';
import omit from './omit/omit';
import pick from './pick/pick';
import pushByIndex from './push-by-index/push-by-index';
import push from './push/push';
import removeByItemIndex from './remove-by-item-index/remove-by-item-index';
import removeObjByKey from './remove-obj-by-key/remove-obj-by-key';
import remove from './remove/remove';
import unique from './unique/unique';
import uniqueSort from './unique-sort/unique-sort';
import compareIntersection from './compare-intersection/compare-intersection';
import createNumberArray from './create-number-array/create-number-array';

export default {
  addProps, assign,
  compareIntersection, createNumberArray,
  filterItemByPath, filterItemListByPaths,
  includes, initArray, isNotEmpty,
  mapByKey, merge,
  omit,
  pick, push, pushByIndex, pushArray,
  remove, removeByIndex: removeByItemIndex, removeObjByKey,
  unique, uniqueSort
} as const;
