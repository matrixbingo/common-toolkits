import { set } from "lodash";
import { ObjectType } from "../../types";

const setFields = (object: object, data: ObjectType) => {
  Object.entries(data).forEach((v) => {
    set(object, v[0], v[1]);
  });
};

export default setFields;
