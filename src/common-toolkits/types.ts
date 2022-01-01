import { Moment } from 'moment';

export type Raw = string | number;

export type ObjectType = Record<Raw, any>;

export type ObjectTypeArray = Record<Raw, any>[];

export type DateTypeInterface = Moment | string;

export enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

// export enum Period {day, week, month, other};

export const Period1 = {
  millisecond: 'millisecond',
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  week: 'week',
  isoWeek: 'isoWeek',
  month: 'month',
  quarter: 'quarter',
  year: 'year',
  date: 'date',
};

export enum Period {
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  isoWeek,
  month,
  quarter,
  year,
  date,
}

export enum DateType {
  dateMoment,
  dateString,
}

export const FormatDate = {
  SECONDS_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  SECONDS: 'YYYYMMDDHHmmss',
  DAY_FORMAT: 'YYYY-MM-DD',
};
