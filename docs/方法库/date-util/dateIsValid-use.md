# dateIsValid

`判断时间格式字符串是否指定格式`


## 代码演示
<code src="./dateIsValid-use.tsx" />

### 基础用法
```jsx | pure
DateUtil.dateIsValid('2022-03-12');
```

```jsx | pure
DateUtil.dateIsValid('2022-03-12 12:22:33', FormatDate.SECONDS_FORMAT);
```


## API
```jsx | pure
DateUtil.dateIsValid(value, [format]);
```

### Params

| 参数   | 说明               | 类型   | 默认值     | 必填 |
| ------ | ------------------ | ------ | ---------- | ---- |
| date   | 时间参数 \| Moment | string | -          | 是   |
| format | 时间格式           | string | YYYY-MM-DD | 否   |
