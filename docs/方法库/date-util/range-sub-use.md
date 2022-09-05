# range-sub

`最近多少 天，周，月，季，年 等`


## 代码演示

### 基础用法
<code src="./range-sub-use.tsx" />


## API
```jsx | pure
DateUtil.rangeSub(Period.day, {rang: 1} )
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
