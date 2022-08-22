import { set } from "lodash";
import TransformUtil from "../../transform-util";
import ObjectUtil from "../../object-util";
import DataUtil from "../../data-util";

/**
 * @param arr 计算两个集合的交集，给name添加boolean值
 * @param list
 * @param options
 * @returns
 */
const compareIntersection = (arr: Record<any, any>[], list: Record<any, any>[], options: { path: string; pathTo?: string; name: string; useList?: boolean; needUUId?: string }) => {
  const { path, name, pathTo, needUUId, useList = false } = options;
  const _pathTo = pathTo ?? path;
  const keys = useList ? list : TransformUtil.toArrByPath(list, _pathTo);
  arr.forEach((i) => {
    const key = ObjectUtil.getField(i, path);
    if (keys.includes(key)) {
      set(i, name, true);
    } else {
      set(i, name, false);
    }
    !!needUUId && set(i, needUUId, DataUtil.uuid());
  });
  return arr;
};

export default compareIntersection;
