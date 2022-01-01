import { isEmpty } from 'lodash';

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

/**
 * 组合请求参数
 * @param {b:1,c:2}
 * @returns ?b=1&c=2
 */
const initParams = (data: Record<string, any>): string => {
  if (!data || isEmpty(data)) return '';
  return Object.entries(data).reduce((rs, next) => {
    rs += `&${next[0]}=${next[1]}`;
    return rs;
  }, '');
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
const getParameterByName = (name: string): string => {
  const reg = '[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)';
  const arr = new RegExp(reg).exec(location.href) || Array(2).fill('');
  const param = arr[1].replace(/\+/g, '%20');
  return decodeURIComponent(param);
};

/**
 * 扩展参数，如果有重复，新覆盖旧
 * @param param
 * @param url
 * @returns
 */
const extendParam = (
  param: Record<string, string> = {},
  url: string = window.location.href,
): string => {
  const host = url.trim().split('?')[0];
  const query = urlParams(url);
  const params = { ...query, ...param };
  return host + (isEmpty(params) ? '' : `?${initParams(params)}`);
};

export default {
  urlParams,
  initParams,
  getParameterByName,
  extendParam,
};
