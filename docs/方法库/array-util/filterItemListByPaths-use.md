# filterItemListByPaths

`根据path的对应的value集合，从arr里查找`


## 代码演示

### 基础用法
<code src="./filterItemListByPaths-use" />


## API
```jsx | pure
ArrayUtil.filterItemListByPaths(arr, path, values)
```

### Params

```jsx | pure
 <T>( arr: T[], path: string, values: any[] ): T[]
```
| 参数   | 说明 | 类型   | 默认值 | 必填 |
| ------ | ---- | ------ | ------ | ---- |
| arr    | 数组 | T[]    | -      | 是   |
| path   | 路径 | string | -      | 是   |
| values | 值   | any[]  | -      | 是   |
