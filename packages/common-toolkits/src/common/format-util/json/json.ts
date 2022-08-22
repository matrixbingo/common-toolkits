import { isString } from 'lodash';

/**
 * 格式化，显示用
 * @param value
 * @returns
 */
const json = (value: any) => {
  const stringify = (data: any) =>
    JSON.stringify(
      data,
      (key, value) => {
        switch (true) {
          case typeof value === 'undefined':
            return 'undefined';
          case typeof value === 'symbol':
            return value.toString();
          case typeof value === 'function':
            return value.toString();
          default:
            break;
        }
        return value;
      },
      2,
    );

  return isString(value) ? stringify(JSON.parse(value)) : stringify(value);
};

export default json;
