import equals from './equals/equals';
import isValidKey from './is-valid-key/is-valid-key';
import getField from './get-field/get-field';
import setField from './set-field/set-field';
import setFields from './set-field/set-fields';
import some from './some/some';
import pick from './pick/pick';
import omit from './omit/omit';
import trim from './trim/trim';

export default {
  equals, getField, isValidKey, omit, pick, setField, setFields, some, trim,
} as const;
