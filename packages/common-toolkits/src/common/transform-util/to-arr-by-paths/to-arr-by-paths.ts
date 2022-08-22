import toArrByPath from "../to-arr-by-path/to-arr-by-path";

/**
 * 与toArrByPath类似，依赖toArrByPath,输出多组
 * @param arr  [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}]
 * @param Paths ['id', 'name']
 * @returns {id:['a1', 'a2'], name:['n1', 'n2']}
 */
const toArrByPaths = (arr: any[], paths: string[]): any => {
  return paths.reduce((rs, path) => {
    rs[path] = toArrByPath(arr, path);
    return rs;
  }, {} as any);
};

export default toArrByPaths;

