import unique from "../unique/unique";

/**
 * 去重，简单排序，TODO 支撑自定义排序
 * @param arr
 * @returns
 */
const uniqueSort = (arr: any): any[] => unique(arr).sort();

export default uniqueSort;
