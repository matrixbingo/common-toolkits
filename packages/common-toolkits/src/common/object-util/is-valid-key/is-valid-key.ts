
/**
 * 判断key在object内
 * @param key
 * @param object
 * @returns
 */
const isValidKey = ( key: string | number | symbol, object: object ): key is keyof typeof object => {
  return key in object;
}

export default isValidKey;
