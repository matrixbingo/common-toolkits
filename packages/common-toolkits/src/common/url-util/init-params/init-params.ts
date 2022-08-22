import { isEmpty } from "lodash";

/**
 *
 * @param param  * 组合请求参数
 * @param {b:1,c:2}
 * @param first 是否去掉第一个&符
 * @returns ?b=1&c=2
 */
const initParams = (param: Record<string, any>, first: boolean = true): string => {
  if (!param || isEmpty(param)) return '';
  return Object.entries(param).reduce((rs, next) => {
    if(first){
      rs += `${next[0]}=${next[1]}`;
      first = false;
    }else {
      rs += `&${next[0]}=${next[1]}`;
    }
    return rs;
  }, '');
};

export default initParams;
