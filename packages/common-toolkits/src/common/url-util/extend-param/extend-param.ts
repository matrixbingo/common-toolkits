import { isEmpty, split } from 'lodash';
import initParams from '../init-params/init-params';
import urlParams from '../url-params/url-params';

/**
 * 扩展参数，如果有重复，新覆盖旧
 * @param param
 * @param url
 * @returns
 */
const extendParam = ( param: Record<string, string> = {}, url: string = location.href ): string => {
  url = url.trim();
  let host = url;
  if(url.includes('?')) {
    host = split(url, '?')[0];
    const query = urlParams(url);
    const params = { ...query, ...param };
    return host + (isEmpty(params) ? '' : `?${initParams(params)}`);
  };
  return host + (isEmpty(param) ? '' : `?${initParams(param)}`);
};

export default extendParam;
