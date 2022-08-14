# currency

`格式化数字字符串或数字，四舍五入`


## 代码演示
<code src="./currency-use.tsx" />

### 基础用法

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



## API
```jsx | pure
FormatUtil.currency(10000);
```

### Params
```jsx | pure
(num: any, precision: number, separator: string): string 
```
| 参数      | 说明       | 类型             | 默认值 | 必填 |
| --------- | ---------- | ---------------- | ------ | ---- |
| num       | 数组       | string \| number | -      | 是   |
| precision | 小数点位数 | number           | -      | 是   |
| separator | 分隔符     | string           | ,      | 否   |
