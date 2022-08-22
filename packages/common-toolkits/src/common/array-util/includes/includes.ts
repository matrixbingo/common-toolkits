/**
 * 判断是否在列表内
 */
const includes = (arr: any[], fun: (item: any) => boolean) => arr.some((i) => fun(i));

export default includes;
