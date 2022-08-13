# diff

`时间差`


## 代码演示

### 基础用法
<code src="./diff-use" />


## API
```jsx | pure
DateUtil.diff(beginDate, endDate, [Period=Period.day], [String=FormatDate.DAY_FORMAT])
```

### Params

| 参数      | 说明     | 类型             | 默认值                             | 必填 |
| --------- | -------- | ---------------- | ---------------------------------- | ---- |
| beginDate | 开始时间 | Moment \| string | -                                  | 是   |
| endDate   | 结束时间 | Moment \| string | -                                  | 是   |
| Period    | 周期     | Period           | Period.day                         | 否   |
| format    | 时间格式 | string           | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |
