import { cloneDeep, isEmpty, replace } from "lodash";

/**
 * 替换url pathVariable 参数
 * @param url
 * @param params
 * @param options  omit: 是否omit参数，不改变初始参数
 * @returns
 */
const pathVariable = (url: string, params: Record<string, any>, options: { separator: string; omit: boolean} = { separator: ':', omit: true}) => {
  if(isEmpty(params)) return { url, params };
  const { separator, omit } = options;
  if(omit){
    const _params = cloneDeep(params);
    Object.entries(params).forEach(([k, v]) => {
      const key = separator + k;
      if (url.includes(key)) {
        url = replace(url, key, v);
        delete _params[k];
      }
    });
    return { url, params: _params} ;
  } else {
    Object.entries(params).forEach(([k, v]) => {
      url = replace(url,  separator + k, v);
    });
  }

  return { url, params };
};

export default pathVariable;
