# push

`默认简单类型,customizer是默认对简单类型去重的方法`


## 代码演示

### 基础用法
<code src="./push-use.tsx" />


## API
```jsx | pure
ArrayUtil.push(arr, ele, [customizer]);
```

### Params

```jsx | pure
<T extends Raw | ObjectType>( arr: T[], ele: T, customizer?: (item: T) => boolean ): T[]
```
| 参数       | 说明       | 类型                 | 默认值                   | 必填 |
| ---------- | ---------- | -------------------- | ------------------------ | ---- |
| arr        | 数组       | T[]                  | -                        | 是   |
| ele        | 元素       | any                  | -                        | 是   |
| customizer | 自定义方法 | (item: T) => boolean | arr.indexOf(ele) === -1) | 否   |

