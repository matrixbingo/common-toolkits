import equal from 'fast-deep-equal';
import deepEqual from 'deep-equal';

const equals = (a: any, b: any) => {
  return equal(a, b) || deepEqual(a, b);
}

export default equals;
