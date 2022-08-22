import lodash from 'lodash';

/**
 * 给对象数组的每一个对象添加属性
 * @param arr
 * @param item
 * @returns
 */
const merge = <T, S>(arr: T[], item: S): T[] => arr.map((i) => lodash.merge(i, item));

export default merge;
