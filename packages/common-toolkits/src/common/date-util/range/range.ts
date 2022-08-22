import moment, { DurationInputArg2, unitOfTime } from "moment";
import { Moment } from "moment";
import { DateType, FormatDate, Period } from "../../types";

/**
 * 时间范围 当天，当周，当月，当季，当年 等
 * @param _period
 * @param rest
 * @returns
 */
const range = <T extends Moment | string>(_period: Period, rest: { dateType?: DateType; format?: string; rang?: number[] } = {} ): T[] => {
  const { dateType = DateType.dateString, rang = [], format = FormatDate.SECONDS_FORMAT } = rest;
  const hasRange = rang.length === 2;
  const beginDate = hasRange ? moment().subtract(rang[0], Period[_period] as DurationInputArg2) : moment().startOf(Period[_period] as unitOfTime.StartOf);
  const endDate = hasRange ? moment().subtract(rang[1], Period[_period] as DurationInputArg2) : moment().endOf(Period[_period] as unitOfTime.StartOf);
  if (dateType === DateType.dateMoment) {
    return [beginDate, endDate] as T[];
  }
  return [beginDate.format(format), endDate.format(format)] as T[];
};

export default range;
