/**
 * 首字母大写
 * @param input
 */
const firstToUpper = (str: string) => {
  return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
    return $1.toUpperCase() + $2;
  });
};

export default firstToUpper;
