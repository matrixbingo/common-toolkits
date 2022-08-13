# toMoment

`时间格式字符串转换成Moment对象`


## 代码演示

### 基础用法
```jsx | pure
DateUtil.toMoment('2022-03-12');
```

```jsx | pure
DateUtil.toMoment('2022-03-12 12:22:33', FormatDate.SECONDS_FORMAT);
```

## API
```jsx | pure
DateUtil.toMoment(value, [format]);
```

### Params

| 参数   | 说明               | 类型   | 默认值                             | 必填 |
| ------ | ------------------ | ------ | ---------------------------------- | ---- |
| value  | 时间参数 \| Moment | string | -                                  | 是   |
| format | 时间格式           | string | FormatDate.DAY_FORMAT (YYYY-MM-DD) | 否   |

