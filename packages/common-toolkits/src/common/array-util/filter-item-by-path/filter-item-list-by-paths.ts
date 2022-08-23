import ObjectUtil from '../../object-util';

/**
* 根据path的对应的value集合，从arr里查找
* @param arr [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}, {id: 'a3', name: 'n3'}]
* @param path  id
* @param values ['a1', 'a2']
* @returns [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
*/
const filterItemListByPaths = <T>( arr: T[], path: string, values: any[] ): T[] => {
  return arr.reduce((rs, next) => {
    values.includes(ObjectUtil.getField(next, path)) && rs.push(next);
    return rs;
  }, [] as T[]);
};

export default filterItemListByPaths;
