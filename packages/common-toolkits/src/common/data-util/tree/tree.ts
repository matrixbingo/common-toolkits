import { isArray, has, get, set } from 'lodash';

const tree = {
  /**
   * 树形结构里搜索
   * @param array
   * @param children
   * @param customizer
   * @returns
   */
  filter: ( array: any[], children = 'children', customizer = (object: { text: string }) => object.text === '' ) => {
    const getNodes = ( result: any[], object: { text: string; [x: string]: any } ) => {
      if (customizer(object)) {
        result.push(object);
        return result;
      }
      if (Array.isArray(object[children])) {
        const nodes = object[children].reduce(getNodes, []);
        if (nodes.length) result.push({ ...object, children: nodes });
      }
      return result;
    };
    return array.reduce(getNodes, []);
  },
  getMaxlevel: (treeData: any, children = 'children') => {
    let maxLevel = 0;
    function loop(data: any[], level: number) {
      data.length > 0 &&
        data.forEach((item: { [x: string]: any; level: any }) => {
          item.level = level;
          if (level > maxLevel) {
            maxLevel = level;
          }
          if (children in item) {
            if (item[children].length > 0) {
              loop(item[children], level + 1);
            }
          }
        });
    }
    loop(treeData, 1);
    return maxLevel;
  },

  /**
   * 从树形结构中去对应的值
   * @param arr
   * @param children
   * @param key
   * @param list
   * @param filter
   * @returns
   */
  valuesFromTree: (arr: any[], children = 'children', key = 'key', list: any[] = [], filter: (item: any) => boolean = () => true) => {
    arr.forEach((i) => {
      if (has(i, key) && filter(i)) {
        list.push(get(i, key));
      }
      const childrens = get(i, children);
      if (isArray(childrens)) {
        tree.valuesFromTree(childrens, children, key, list);
      }
    });
    return list;
  },

  /**
   * 从树形结构中获取键值对
   * @param arr
   * @param children
   * @param key
   * @param list
   * @param filter
   * @returns
   */
  keyValuesFromTree: (arr: any[], children = 'children', key = 'key', value = 'value', obj: any = {}, filter: (item: any) => boolean = () => true) => {
    arr.forEach((i) => {
      if (has(i, key) && has(i, value) && filter(i)) {
        set(obj, get(i, key), get(i, value));
      }
      const childrens = get(i, children);
      if (isArray(childrens)) {
        tree.keyValuesFromTree(childrens, children, key, value, obj);
      }
    });
    return obj;
  },
};

export default tree;
