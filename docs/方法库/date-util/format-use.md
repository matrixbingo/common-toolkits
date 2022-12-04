# format

`格式化字符串时间格式`


## 代码演示
<code src="./format-use.tsx" />

### 基础用法
```jsx | pure
DateUtil.format('2022-03-12', 'YYYY-MM-DD');
```

```jsx | pure
DateUtil.format('20220312', 'YYYYMMDD', FormatDate.DAY_FORMAT);
```


## API
```jsx | pure
DateUtil.format(value, formatInt, [formatOut]);
```

### Params

| 参数      | 说明         | 类型   | 默认值     | 必填 |
| --------- | ------------ | ------ | ---------- | ---- |
| value     | 时间         | string | -          | 是   |
| formatInt | 入参时间格式 | string | 无         | 是   |
| formatOut | 出参时间格式 | string | YYYY-MM-DD | 否   |
