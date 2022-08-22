/**
 * 给数字添加千分位 10000 => 10,000
 * @param num
 * @returns
 */
const thousands = (num: string | number): string => String(num).replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);

export default thousands;
