# unique

`删除指定值,customizer是默认对简单类型删除`


## 代码演示

### 基础用法
<code src="./unique-use" />


## API
```jsx | pure
ArrayUtil.unique(arr, customizer);
```

### Params
```jsx | pure
<T>(arr: T[], customizer?: (val: T) => string): Array<T>
```
| 参数       | 说明       | 类型 | 默认值              | 必填 |
| ---------- | ---------- | ---- | ------------------- | ---- |
| arr        | 数组       | T[]  | -                   | 是   |
| customizer | 自定义方法 | T    | (val: T) => any) | -    | 否   
