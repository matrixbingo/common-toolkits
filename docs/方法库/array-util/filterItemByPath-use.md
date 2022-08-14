# filterItemByPath

`根据path对应的value，从arr里查找`


## 代码演示

### 基础用法
<code src="./filterItemByPath-use.tsx" />


## API
```jsx | pure
ArrayUtil.filterItemByPath(arr, path, value)
```


### Params

```jsx | pure
<T>(arr: T[], path: string, value: any): T[]
```
| 参数  | 说明 | 类型   | 默认值 | 必填 |
| ----- | ---- | ------ | ------ | ---- |
| arr   | 数组 | T[]    | -      | 是   |
| path  | 路径 | string | -      | 是   |
| value | 值   | any    | -      | 是   |
