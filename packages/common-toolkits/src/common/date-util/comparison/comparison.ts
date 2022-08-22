import { DateTypeInterface, FormatDate } from '../../types';
import toMoment from '../to-moment/to-moment';

/**
 * 比较两个时间
 * @param beginDate
 * @param endDate
 * @param format
 * @returns
 */
const comparison = ( beginDate: DateTypeInterface, endDate: DateTypeInterface, format = FormatDate.DAY_FORMAT ): boolean => {
  const _beginDate = toMoment(beginDate, format);
  const _endDate = toMoment(endDate, format);
  return _endDate.diff(_beginDate) > 0;
};

export default comparison;
