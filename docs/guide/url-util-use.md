---
title: UrlUtil
nav:
  title: 指南
  order: 3
---

## UrlUtil

### extendParam
扩展参数，如果有重复，新覆盖旧
```jsx | pure
UrlUtil.extendParam(param, [url]);
```
<code src="../examples/url/extendParam-use.tsx" />

### getParameterByName
获取url的参数
```jsx | pure
UrlUtil.getParameterByName(name, [url]);
```
<code src="../examples/url/getParameterByName-use.tsx" />

### initParams
组合请求参数
```jsx | pure
UrlUtil.initParams(data, [first]);
```
<code src="../examples/url/initParams-use.tsx" />

### pathVariable
替换url pathVariable 参数
```jsx | pure
UrlUtil.pathVariable(url, params, [options]);
```
<code src="../examples/url/pathVariable-use.tsx" />

### urlParams
组合请求参数
```jsx | pure
UrlUtil.urlParams(url);
```
<code src="../examples/url/urlParams-use.tsx" />

## API

### extendParam

```jsx | pure
( param: Record<string, string> = {}, url: string = window.location.href ): string 
```
| 参数  | 说明 | 类型                   | 默认值               | 必填 |
| ----- | ---- | ---------------------- | -------------------- | ---- |
| param | 参数 | Record<string, string> | -                    | 是   |
| url   | url  | string                 | window.location.href | 否   |

### getParameterByName
```jsx | pure
( name: string, url: string = location.href ): string 
```
| 参数 | 说明 | 类型   | 默认值               | 必填 |
| ---- | ---- | ------ | -------------------- | ---- |
| name | 参数 | string | -                    | 是   |
| url  | url  | string | window.location.href | 否   |

### initParams
```jsx | pure
(data: Record<string, any>, first: boolean = true): string
```
| 参数  | 说明              | 类型                | 默认值 | 必填 |
| ----- | ----------------- | ------------------- | ------ | ---- |
| param | 参数              | Record<string, any> | -      | 是   |
| first | 是否去掉第一个&符 | boolean             | true   | 否   |

### pathVariable

| 参数    | 说明 | 类型                                | 默认值                        | 必填 |
| ------- | ---- | ----------------------------------- | ----------------------------- | ---- |
| url     | url  | string                              | window.location.href          | 是   |
| param   | 参数 | Record<string, string>              | -                             | 是   |
| options | 配置 | { separator: string; omit: boolean} | { separator: ':', omit: true} | 否   |

### urlParams

| 参数 | 说明 | 类型   | 默认值               | 必填 |
| ---- | ---- | ------ | -------------------- | ---- |
| url  | url  | string | window.location.href | 否   |
