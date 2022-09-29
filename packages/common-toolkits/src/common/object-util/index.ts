import equals from './equals/equals';
import isValidKey from './is-valid-key/is-valid-key';
import getField from './get-field/get-field';
import setField from './set-field/set-field';
import setFields from './set-field/set-fields';
import some from './some/some';
import pick from './pick/pick';
import omit from './omit/omit';
import trim from './trim/trim';
import pushAsObject from './push-as-object/push-as-object';
import pushAsArray from './push-as-array/push-as-array';

export default {
  equals, getField, isValidKey, omit, pick, setField, setFields, some, trim, pushAsObject, pushAsArray
} as const;
