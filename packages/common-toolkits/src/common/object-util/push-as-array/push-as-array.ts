import { get, isArray, set } from "lodash";

const pushAsArray = (data: object, path: string, value: any) => {
  const array = get(data, path);
  if (isArray(array)) {
    array.push(value);
  } else {
    set(data, path, [value]);
  }
};

export default pushAsArray;
