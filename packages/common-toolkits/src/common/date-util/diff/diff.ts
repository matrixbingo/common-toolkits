import { unitOfTime } from "moment";
import { DateTypeInterface, FormatDate, Period } from "../../types";
import toMoment from "../to-moment/to-moment";

/**
 *  时间差
 * @param beginDate
 * @param endDate
 * @param _period
 * @param format
 * @returns
 */
const diff = ( beginDate: DateTypeInterface, endDate: DateTypeInterface, _period: Period = Period.day, format = FormatDate.DAY_FORMAT ): number => {
  const _beginDate = toMoment(beginDate, format);
  const _endDate = toMoment(endDate, format);
  return _endDate.diff(_beginDate, Period[_period] as unitOfTime.Diff);
};

export default diff;
