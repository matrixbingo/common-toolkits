import lodash from 'lodash';

/**
 * 中英文逗号，分号，分割
 * @param input
 */
const splitByComma = (input: string) => {
  const arr = input.split(/[\n\s+,，；;]/g);
  lodash.remove( arr, (i) => lodash.isEmpty(i) );
  return arr;
};

export default splitByComma;
