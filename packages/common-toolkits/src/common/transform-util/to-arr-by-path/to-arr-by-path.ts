import getField from "../../object-util/get-field/get-field";

const toArrByPath = (arr: any[], path: string): any[] => arr.reduce((list, next) => {
  list.push(getField(next, path));
  return list;
}, [] as any[]);

export default toArrByPath;
