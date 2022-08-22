import result from './result/result';
import params from './params/params';
import tree from './tree/tree';
import input from './input/input';
import initRate from './init-rate/init-rate';

/**
 * 生成32位uuid
 * @returns string
 */
const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

export default {
  result, tree, input, initRate, params, uuid
} as const;
