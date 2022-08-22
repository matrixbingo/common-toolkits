import { isFunction } from 'lodash';
import ObjectUtil from '../../object-util';

/**
 * 根据path对应的value，从arr里查找
 * @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @param path  id
 * @param customizer 'a1'
 * @returns [{id: 'a1', name: 'n1'}]
 */
const filterItemByPath = <T>(arr: T[], path: string, customizer: any | ((item: any, p: any) => boolean)): T[] => {
  if (isFunction(customizer)){
    return arr.filter((e) => customizer(ObjectUtil.getField(e, path), e));
  }
  return arr.filter((e) => customizer === ObjectUtil.getField(e, path));
};

export default filterItemByPath;
