# pathVariablev

`替换url pathVariable 参数`


## 代码演示

### 基础用法
<code src="./pathVariable-use.tsx" />


## API
```jsx | pure
UrlUtil.pathVariable(url, params, [options]);
```

### Params


| 参数    | 说明 | 类型                                | 默认值                        | 必填 |
| ------- | ---- | ----------------------------------- | ----------------------------- | ---- |
| url     | url  | string                              | window.location.href          | 是   |
| param   | 参数 | Record<string, string>              | -                             | 是   |
| options | 配置 | { separator: string; omit: boolean} | { separator: ':', omit: true} | 否   |
