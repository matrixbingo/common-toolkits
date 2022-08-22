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

export default getParameterByName;
