import moment, { DurationInputArg2, unitOfTime } from "moment";
import { Moment } from "moment";
import { DateType, FormatDate, Period } from "../../types";

/**
 * 最近多少 天，周，月，季，年 等
 * @param _period
 * @param rest
 * @returns
 */
const rangeSub = <T extends Moment | string>(_period: Period, rest: { dateType?: DateType; format?: string; rang?: number } = {} ): T[] => {
  const { dateType = DateType.dateString, rang = 0, format = FormatDate.DAY_FORMAT } = rest;
  const beginDate = moment().subtract(rang, Period[_period] as DurationInputArg2);
  const endDate = moment();
  if (dateType === DateType.dateMoment) {
    return [beginDate, endDate] as T[];
  }
  return [beginDate.format(format), endDate.format(format)] as T[];
};

export default rangeSub;
