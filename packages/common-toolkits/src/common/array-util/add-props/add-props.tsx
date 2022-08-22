/**
 * 给数组对象添加属性
 * @param arr
 * @param props
 * @returns
 */
const addProps = (arr: Record<any, any>[], props: Record<any, any>) => {
  return arr.reduce((rs, next) => {
    rs.push({ ...next, ...props });
    return rs;
  }, []);
};

export default addProps;
