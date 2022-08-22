import { ObjectType, Raw } from "../../types";

/**
 * 默认简单类型,默认去重push
 */
const push = <T extends Raw | ObjectType>( arr: T[], ele: T, customizer?: (item: T) => boolean ): T[] => {
  const includeFun = customizer ?? (() => arr.indexOf(ele) === -1);
  if (includeFun(ele)) arr.push(ele);
  return arr;
};

export default push;
