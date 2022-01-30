---
title: DateUtil
nav:
  title: 指南
  order: 3
---

# 示例

## date-util

### comparison
比较两个时间
```jsx | pure
DateUtil.comparison(beginDate, endDate, 'YYYY-MM-DD HH:mm:ss')
```
<code src="../examples/date/comparison-use" />

### currFormat
格式化输出当前时间
```jsx | pure
DateUtil.currFormat(format);
```
<code src="../examples/date/currFormat-use" />

### diff
格式化输出当前时间
```jsx | pure
DateUtil.diff(beginDate, endDate, 'YYYY-MM-DD HH:mm:ss');
```
<code src="../examples/date/diff-use" />

### range
时间范围 当天，当周，当月，当季，当年 等
```jsx | pure
DateUtil.range(Period.day);
```
<code src="../examples/date/range-use" />

### timeStamp
获取时间戳
```jsx | pure
DateUtil.timeStamp(value, format);
```
<code src="../examples/date/timeStamp-use" />

### toMoment
获取时间戳
```jsx | pure
DateUtil.toMoment();
```

## API

### comparison

| 参数      | 说明     | 类型             | 默认值                             | 必填 |
| --------- | -------- | ---------------- | ---------------------------------- | ---- |
| beginDate | 开始时间 | Moment \| string | -                                  | 是   |
| endDate   | 结束时间 | Moment \| string | -                                  | 是   |
| format    | 时间格式 | string           | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |


### currFormat

| 参数   | 说明     | 类型   | 默认值                                          | 必填 |
| ------ | -------- | ------ | ----------------------------------------------- | ---- |
| format | 时间格式 | string | FormatDate.SECONDS_FORMAT (YYYY-MM-DD HH:mm:ss) | 是   |

### diff

| 参数      | 说明     | 类型             | 默认值                             | 必填 |
| --------- | -------- | ---------------- | ---------------------------------- | ---- |
| beginDate | 开始时间 | Moment \| string | -                                  | 是   |
| endDate   | 结束时间 | Moment \| string | -                                  | 是   |
| Period    | 周期     | Period           | Period.day                         | 否   |
| format    | 时间格式 | string           | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |

### range

| 参数   | 说明     | 类型                                                      | 默认值                             | 必填 |
| ------ | -------- | --------------------------------------------------------- | ---------------------------------- | ---- |
| Period | 周期     | Period                                                    | Period.day                         | 是   |
| rest   | 时间格式 | { dateType?: DateType; format?: string; rang?: number[] } | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |

#### range.rest
| 参数     | 说明               | 类型                                 | 默认值                                          | 必填 |
| -------- | ------------------ | ------------------------------------ | ----------------------------------------------- | ---- |
| dateType | 时间类型           | DateType（dateMoment \| dateString） | DateType.dateString                             | 否   |
| format   | 时间格式           | string                               | FormatDate.SECONDS_FORMAT (YYYY-MM-DD HH:mm:ss) | 否   |
| rang     | 默认开始结束偏移值 | number[]                             | []                                              | 否   |

### timeStamp

| 参数   | 说明     | 类型   | 默认值                                          | 必填 |
| ------ | -------- | ------ | ----------------------------------------------- | ---- |
| format | 时间格式 | string | FormatDate.SECONDS_FORMAT (YYYY-MM-DD HH:mm:ss) | 否   |

### toMoment

| 参数   | 说明               | 类型   | 默认值                             | 必填 |
| ------ | ------------------ | ------ | ---------------------------------- | ---- |
| value  | 时间参数 \| Moment | string | -                                  | 是   |
| format | 时间格式           | string | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |
