import moment, { DurationInputArg2, Moment, unitOfTime } from 'moment';
import { DateType, DateTypeInterface, FormatDate, Period } from './types';

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

/**
 * 格式化输出当前时间
 * @param format
 * @returns
 */
const currFormat = (format = FormatDate.SECONDS_FORMAT) => moment().format(format);

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

/**
 * 获取时间戳
 * @returns
 */
const timeStamp = (format = FormatDate.SECONDS_FORMAT): string => currFormat(format);

const toMoment = ( value: DateTypeInterface, format = FormatDate.DAY_FORMAT ): Moment => moment.isMoment(value) ? value : moment(value, format);

export default {
  comparison, currFormat, diff, range, timeStamp, toMoment
} as const;
