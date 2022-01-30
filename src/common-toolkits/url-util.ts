import { cloneDeep, has, isEmpty, replace, split, startsWith } from 'lodash';

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

/**
 * 获取url的参数
 * @param {键} name
 * @returns 对应的键的值
 * @example
 * const { getParameterByName } = require('happy-utils/url')
 * getParameterByName("ben");
 * // "123"
 */
const getParameterByName = ( name: string, url: string = location.href ): string => {
  const reg = '[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)';
  const arr = new RegExp(reg).exec(url) || Array(2).fill('');
  const param = arr[1].replace(/\+/g, '%20');
  return decodeURIComponent(param);
};

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

/**
 * 获取GET请求参数的对象
 * @param url
 * @returns
 */
const urlParams = (url: string = window.location.href): Record<string, any> => {
  if (!url.includes('?')) return {};
  const query = url.trim().split('?')[1];
  return query.split('&').reduce((params, next) => {
    const param = next.split('=');
    params[param[0]] = param[1];
    return params;
  }, {});
};

export default {
  extendParam, getParameterByName, initParams, pathVariable, urlParams
} as const;
