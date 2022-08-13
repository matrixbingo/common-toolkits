# initParams

`组合请求参数`


## 代码演示

### 基础用法
<code src="./initParams-use.tsx" />


## API
```jsx | pure
UrlUtil.initParams(data, [first]);
```

### Params

```jsx | pure
(data: Record<string, any>, first: boolean = true): string
```
| 参数  | 说明              | 类型                | 默认值 | 必填 |
| ----- | ----------------- | ------------------- | ------ | ---- |
| param | 参数              | Record<string, any> | -      | 是   |
| first | 是否去掉第一个&符 | boolean             | true   | 否   |
