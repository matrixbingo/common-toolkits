# omit

`取补集，可自定义取，如果index为true则取下标的补集, 且如果index为true则customizer 必须是数组`


## 代码演示

### 基础用法
<code src="./omit-use.tsx" />
<code src="./omit-use2.tsx" />

## API
```jsx | pure
ArrayUtil.omit(list, arr, [index]);
```


### Params
```jsx | pure
<T extends Raw | Record<any, any>>( list: T[], customizer: any[] | ((val: T) => boolean), index = false ): Array<T>
```

| 参数       | 说明             | 类型                         | 默认值 | 必填 |
| ---------- | ---------------- | ---------------------------- | ------ | ---- |
| list       | 数组             | T[]                          | -      | 是   |
| customizer | 数组或方法       | any[] 或 (val: T) => boolean | -      | 是   |
| index      | 是否使用数组下标 | boolean                      | false  | 否   |
