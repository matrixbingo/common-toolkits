import comparison from './comparison/comparison';
import currFormat from './curr-format/curr-format';
import dateIsValid from './date-is-valid/date-is-valid';
import diff from './diff/diff';
import range from './range/range';
import timeStamp from './time-stamp/time-stamp';
import toMoment from './to-moment/to-moment';

export default {
  comparison, currFormat, dateIsValid, diff, range, timeStamp, toMoment
} as const;
