import Immutable from 'immutable';
import { ObjectType } from '../../types';

const equals = (a: Array<any> | ObjectType, b: Array<any> | ObjectType) => {
  return Immutable.is(Immutable.fromJS(a), Immutable.fromJS(b));
};

export default equals;
