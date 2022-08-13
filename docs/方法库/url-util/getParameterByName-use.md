# getParameterByName

`获取url的参数`


## 代码演示

### 基础用法
<code src="./getParameterByName-use.tsx" />


## API
```jsx | pure
UrlUtil.getParameterByName(name, [url]);
```

### Params

```jsx | pure
( name: string, url: string = location.href ): string 
```
| 参数 | 说明 | 类型   | 默认值               | 必填 |
| ---- | ---- | ------ | -------------------- | ---- |
| name | 参数 | string | -                    | 是   |
| url  | url  | string | window.location.href | 否   |
