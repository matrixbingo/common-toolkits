# extendParam

`扩展参数，如果有重复，新覆盖旧`


## 代码演示

### 基础用法
<code src="./extendParam-use.tsx" />


## API
```jsx | pure
UrlUtil.extendParam(param, [url]);
```

### Params

```jsx | pure
( param: Record<string, string> = {}, url: string = window.location.href ): string 
```
| 参数  | 说明 | 类型                   | 默认值               | 必填 |
| ----- | ---- | ---------------------- | -------------------- | ---- |
| param | 参数 | Record<string, string> | -                    | 是   |
| url   | url  | string                 | window.location.href | 否   |
