---
title: FormatUtil
nav:
  title: 指南
  order: 3
---

# 示例

## FormatUtil

### currency
格式化数字字符串或数字，四舍五入
```jsx | pure
FormatUtil.currency(10000);
```

| 参数                          | 结果      |
| ----------------------------- | --------- |
| currenc(10000)                | 10,000    |
| currenc(10000, 2)             | 10,000.00 |
| currenc(10000.123456, 2)      | 10,000.12 |
| currenc(10000.123456, 2, ' ') | 10 000.12 |
| currenc(.123456, 2, ' ')      | 0.12      |
| currenc(56., 2, ' ')          | 56.00     |
| currenc(56., 0, ' ')          | 56        |
| currenc('56.')                | 56        |
| currenc('56.a')               | NaN       |

<code src="../examples/format/currency-use" />

### percent
百分率
```jsx | pure
FormatUtil.percent(num, [percent]);
```
<code src="../examples/format/percent-use.tsx" />

### thousands
给数字添加千分位 10000 => 10,000
```jsx | pure
FormatUtil.thousands(num);
```
<code src="../examples/format/thousands-use.tsx" />

### json
格式化json，显示用
```jsx | pure
FormatUtil.json(value);
```
<code src="../examples/format/json-use.tsx" />


## API 

### currency

```jsx | pure
(num: any, precision: number, separator: string): string 
```
| 参数      | 说明       | 类型             | 默认值 | 必填 |
| --------- | ---------- | ---------------- | ------ | ---- |
| num       | 数组       | string \| number | -      | 是   |
| precision | 小数点位数 | number           | -      | 是   |
| separator | 分隔符     | string           | ,      | 否   |

### percent

| 参数    | 说明           | 类型             | 默认值 | 必填 |
| ------- | -------------- | ---------------- | ------ | ---- |
| num     | 数字或字符数字 | string \| number | -      | 是   |
| percent | 百分率符号     | string           | %      | 否   |


### thousands

| 参数    | 说明           | 类型             | 默认值 | 必填 |
| ------- | -------------- | ---------------- | ------ | ---- |
| num     | 数字或字符数字 | string \| number | -      | 是   |

### json

| 参数    | 说明           | 类型             | 默认值 | 必填 |
| ------- | -------------- | ---------------- | ------ | ---- |
| value     | 字符串 | string | -      | 是   |
