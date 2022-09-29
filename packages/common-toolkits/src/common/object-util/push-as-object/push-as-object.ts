import { get, isObject, merge, set } from "lodash";

const pushAsObject = (data: object, path: string, value: any) => {
  const obj = get(data, path);
  if (isObject(obj)) {
    merge(obj, value);
  } else {
    set(data, path, value);
  }
};

export default pushAsObject;
