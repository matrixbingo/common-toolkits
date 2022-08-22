/**
 * 创建并初始化一个新数组
 * @param length
 * @param value
 * @returns
 */
const initArray = <T>(length: number = 1, value: T): Array<T> => Array(length).fill(value);

export default initArray;
