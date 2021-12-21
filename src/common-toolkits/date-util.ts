import moment, { Moment } from 'moment';
import lodash from 'lodash';

enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}

enum Period {day, week, month, other}

enum DateType {dateMoment, dateString}

export type DateTypeInterface = Moment | string;

const formatDate = {
  SECONDS_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  SECONDS: 'YYYYMMDDHHmmss',
  DAY_FORMAT: 'YYYY-MM-DD',
};

/**
 * 格式化输出当前时间
 * @param format 
 * @returns 
 */
const currFormat = (format = formatDate.SECONDS_FORMAT) => {
  return moment().format(format);
};

/**
 * 获取时间戳
 * @returns 
 */
const timeStamp = (): string => {
  return currFormat(formatDate.SECONDS_FORMAT);
};

const toMoment = (value: DateTypeInterface, format = formatDate.DAY_FORMAT): Moment => {
  return moment.isMoment(value) ? value : moment(value, format);
};

/**
 * 时间范围
 * @param _period
 * @param rest 
 * @returns 
 */
const range = (_period: Period, rest: {dateType?: DateType; beginDays?: number; format?: string }): Moment[] | string[] => {
  const param = lodash.extend({ dateType: DateType.dateMoment, beginDays: 1, format: formatDate.DAY_FORMAT }, rest);
  const endDate = moment().subtract(1, 'd');
  let beginDate = moment().subtract(param.beginDays, 'd');
  if (_period === Period.week) {
    beginDate = moment().startOf('week');
  } else if (_period === Period.month) {
    beginDate = moment().startOf('month');
  }
  return param.dateType === DateType.dateMoment ? [beginDate, endDate] : [beginDate.format(param.format), endDate.format(param.format)];
};

/**
 *  时间差
 * @param beginDate
 * @param endDate 
 * @param _period 
 * @param format 
 * @returns 
 */
const diff = (beginDate: DateTypeInterface, endDate: DateTypeInterface, _period: Period, format = formatDate.DAY_FORMAT): number => {
  const _beginDate = toMoment(beginDate, format);
  const _endDate = toMoment(endDate, format);
  if (_period === Period.day) {
    return _endDate.diff(_beginDate, 'days') + 1;
  }
  return _endDate.diff(_beginDate);
};

/**
 * 比较两个时间
 * @param beginDate
 * @param endDate 
 * @param _period 
 * @param format 
 * @returns 
 */
const comparison = (beginDate: DateTypeInterface, endDate: DateTypeInterface, _period: Period, format = formatDate.DAY_FORMAT): boolean => {
  const _beginDate = toMoment(beginDate, format);
  const _endDate = toMoment(endDate, format);
  return _endDate.diff(_beginDate) > 0;
};

export default {
  Days,
  Period,
  DateType,
  formatDate,
  currFormat,
  timeStamp,
  toMoment,
  range,
  diff,
  comparison
};