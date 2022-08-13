# trim

`遍历对象，value去空格或指定字符`


## 代码演示

### 基础用法
<code src="./trim-use" />

## API
```jsx | pure
ObjectUtil.trim(obj, [chars]);
```

### Params
```jsx | pure
<T extends ObjectType | ObjectType[]>( data: T, chars?: string ): T
```
| 参数  | 说明             | 类型   | 默认值 | 必填 |
| ----- | ---------------- | ------ | ------ | ---- |
| data  | 目标对象         | T      | -      | 是   |
| chars | 路径或自定义方法 | string | -      | 否   |
