---
title: DataUtil
nav:
  title: 指南
  order: 3
---

## DataUtil

### result
对查询结果缺失的部分设置默认值
```jsx | pure
DataUtil.result.setDefaultValue(data, format);
```
<code src="../examples/data/result-use" />

### unknown

```jsx | pure
DataUtil.unknown.isInt(); // 是否int，包含字符串
```
```jsx | pure
DataUtil.unknown.isPeInt(); // 正整数，不包含0
```
```jsx | pure
DataUtil.unknown.isNeInt(); // 负整数，不包含0
```
```jsx | pure
DataUtil.unknown.isFloat();
```
```jsx | pure
DataUtil.unknown.isJSON(); // 包含字符串
```
```jsx | pure
DataUtil.unknown.parseValue(); //如果是字符串数字则转换成数字，可用于 select, checkbox, radio等转格式
```
```jsx | pure
DataUtil.unknown.isVoid();
```
```jsx | pure
DataUtil.unknown.isFalsy();
```
```jsx | pure
DataUtil.unknown.isColor();
```
<code src="../examples/data/unknown-use" />

### input

```jsx | pure
DataUtil.input.getInt(); // 获取整数部分
```
```jsx | pure
DataUtil.input.getFloat(); // 获取浮点数部分
```
<code src="../examples/data/input-use" />

### params
给参数添加属性值
```jsx | pure
DataUtil.params.extends();
```
<code src="../examples/data/params-extends-use" />

根据实际情况清空数组对象或对象的属性,默认清空
```jsx | pure
DataUtil.params.clear();
```
<code src="../examples/data/params-clear-use" />

### uuid

```jsx | pure
DataUtil.uuid(); // 获取uuid
```
<code src="../examples/data/uuid-use" />


## API 

### result

```jsx | pure
( data: Record<string, string> | Array<Record<string, string>>, format: Record<string, any> ): Record<string, string> | Array<Record<string, string>> 
```
| 参数   | 说明 | 类型                                          | 默认值                        | 必填 |
| ------ | ---- | --------------------------------------------- | ----------------------------- | ---- |
| data   | 数组 | Record<string, string>                        \| Array<Record<string, string>> | -    | 是   
| format | 对象 | Record<string, any> ): Record<string, string> | -                             | 是   |
