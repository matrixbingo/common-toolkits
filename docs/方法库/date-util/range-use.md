# range

`时间范围 当天，当周，当月，当季，当年 等`


## 代码演示

### 基础用法
<code src="./range-use.tsx" />


## API
```jsx | pure
DateUtil.range(Period.day);
```

### Params

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
