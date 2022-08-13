import { isString } from "lodash";

export const compile = (expression: string, scope = {}) => {
  return new Function('$root', `with($root) { return (${expression}); }`)(
    scope
  )
};

export const toJSON = (arr) => isString(arr) ? JSON.parse(arr): arr;

export const toFn = (fun) => isString(fun) ? compile(fun) : fun;
