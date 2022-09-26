import { get, isEmpty, isFunction, set } from "lodash";

const arrayToObject = (list: any[], customizer: {key: string; value: string} | ((item: [string, any]) => any) = { key: 'key', value: 'value' }) => {
  const obj = {} as any;
  if (!isEmpty(list)) {
    list.forEach((i) => {
      if (isFunction(customizer)) {
        const item = customizer(i);
        set(obj, item.key, item.value);
      } else {
        set(obj, get(i, customizer.key), get(i, customizer.value));
      }
    });
  }
  return obj;
};

export default arrayToObject;
