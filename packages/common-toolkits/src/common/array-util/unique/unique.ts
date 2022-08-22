/**
 * 去重,支撑自定义
 * @param arr
 * @returns
 */
export default function unique<T extends number | string | Record<number|string, any>>(arr: any[], createKey: (i: T) => string = () => ''): T[] {
  if (arguments.length > 2) {
    throw new Error('unique: arguments.length error');
  }
  if (arguments.length === 1) return [...new Set(arr)];
  const keys: any[] = [];
  return arr.reduce((item, next) => {
    const key = createKey(next);
    if (!keys.includes(key)) {
      keys.push(key);
      item.push(next);
    }
    return item;
  }, [] as T[]);
}
