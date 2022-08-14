# remove

`删除指定值,customizer是默认对简单类型删除`


## 代码演示

### 基础用法
<code src="./remove-use.tsx" />


## API
```jsx | pure
ArrayUtil.remove(arr, customizer);
```

### Params
```jsx | pure
<T extends Raw | ObjectType>( arr: T[], customizer: T | ((val: T) => boolean) ): Array<T> 
```
| 参数       | 说明           | 类型 | 默认值               | 必填 |
| ---------- | -------------- | ---- | -------------------- | ---- |
| arr        | 数组           | T[]  | -                    | 是   |
| customizer | 值或自定义方法 | T    | (val: T) => boolean) | -    | 是   
