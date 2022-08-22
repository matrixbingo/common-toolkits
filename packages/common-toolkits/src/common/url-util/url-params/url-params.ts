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
  }, {} as Record<string, any>);
};

export default urlParams;
