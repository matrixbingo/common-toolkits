# comparison

`比较两个时间先后`


## 代码演示

### 基础用法
<code src="./comparison-use.tsx" />


## API
```jsx | pure
DateUtil.comparison(beginDate, endDate, 'YYYY-MM-DD HH:mm:ss')
```

### Params
| 参数      | 说明     | 类型             | 默认值                             | 必填 |
| --------- | -------- | ---------------- | ---------------------------------- | ---- |
| beginDate | 开始时间 | Moment \| string | -                                  | 是   |
| endDate   | 结束时间 | Moment \| string | -                                  | 是   |
| format    | 时间格式 | string           | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |
