import push from "../../array-util/push/push";
import getField from "../../object-util/get-field/get-field";

/**
 * 获取指定键生成数组，select all等使用, key支持path
 * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @path id
 * @returns ['a1', 'a2']
 */
const toArrByPathUnique = (arr: any[], path: string): any[] =>  arr.reduce((list, next) => push(list, getField(next, path)), []);

export default toArrByPathUnique;
