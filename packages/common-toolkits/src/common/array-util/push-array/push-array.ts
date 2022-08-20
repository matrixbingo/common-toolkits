import { ObjectType, Raw } from "../../types";

/**
 * 给数组添加数组元素
 */
const pushArray = ( arr: any[], ele: any[], customizer: (item: any) => boolean = (i) => true): any[] => {
  ele.forEach(i => {
    if(customizer(i)){
      arr.push(i);
    }
  })
  return arr;
};

export default pushArray;
