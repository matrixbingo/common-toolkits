---
title: TransformUtil
nav:
  title: 指南
  order: 2
---

# 示例

## TransformUtil

### mapKeys
```jsx | pure
TransformUtil.mapKeys(target, customizer);
```
<code src="../examples/transform/mapKeys-use" />

### objectMapKeys
```jsx | pure
TransformUtil.objectMapKeys(target, customizer);
```
<code src="../examples/transform/objectMapKeys-use" />

### numberArrToStringArr
```jsx | pure
TransformUtil.numberArrToStringArr(arr);
```
<code src="../examples/transform/numberArrToStringArr-use" />

### stringArrToMumberArr
```jsx | pure
TransformUtil.stringArrToMumberArr(arr);
```
<code src="../examples/transform/stringArrToMumberArr-use" />

### select.objectToArray
把 K V 结构的对象转换成数组
```jsx | pure
TransformUtil.select.objectToArray(obj, customizer);
```
<code src="../examples/transform/select/objectToArray-use.tsx" />

### select.formatObject
```jsx | pure
TransformUtil.select.formatObject(obj, customizer);
```
<code src="../examples/transform/select/formatObject-use.tsx" />

### select.formatArray
```jsx | pure
TransformUtil.select.formatArray(obj, customizer);
```
<code src="../examples/transform/select/formatArray-use.tsx" />

### select.formatArrayOrObject
兼容 select.formatObject 和 select.formatArray
```jsx | pure
TransformUtil.select.formatArrayOrObject(obj, customizer);
```
<code src="../examples/transform/select/formatArrayOrObject-use.tsx" />

### select.transformSelect
```jsx | pure
TransformUtil.select.transformSelect(obj, customizer);
```
<code src="../examples/transform/select/transformSelect-use.tsx" />

### toArrByPath
获取指定键生成数组，select all等使用, key支持path
```jsx | pure
TransformUtil.toArrByPath(arr, path);
```
<code src="../examples/transform/toArrByPath-use.tsx" />

### toArrByPathUnique
获取指定键生成数组，select all等使用, key支持path, 去重
```jsx | pure
TransformUtil.toArrByPathUnique(arr, path);
```
<code src="../examples/transform/toArrByPathUnique-use.tsx" />

### toArrByPaths
与toArrByPath类似，依赖toArrByPath,输出多组
```jsx | pure
TransformUtil.toArrByPaths(arr, path);
```
<code src="../examples/transform/toArrByPaths-use.tsx" />

## API

### mapKeys

| 参数       | 说明           | 类型                                      | 默认值 | 必填 |
| ---------- | -------------- | ----------------------------------------- | ------ | ---- |
| target     | 目标对象       | object \| object[]                        | -      | 是   |
| customizer | 自定义转换规则 | object \| ((value: any, key: any) => any) | -      | 是   |

### objectMapKeys

| 参数 | 说明       | 类型     | 默认值 | 必填 |
| ---- | ---------- | -------- | ------ | ---- |
| target     | 目标对象       | object \| object[]                        | -      | 是   |
| customizer | 自定义转换规则 | object \| ((value: any, key: any) => any) | -      | 是   |

### numberArrToStringArr

| 参数 | 说明     | 类型     | 默认值 | 必填 |
| ---- | -------- | -------- | ------ | ---- |
| arr  | 数字数组 | number[] | -      | 是   |

### stringArrToMumberArr

| 参数 | 说明       | 类型     | 默认值 | 必填 |
| ---- | ---------- | -------- | ------ | ---- |
| arr  | 字符串数组 | string[] | -      | 是   |

### select.objectToArray

| 参数       | 说明           | 类型                                                                  | 默认值                       | 必填 |
| ---------- | -------------- | --------------------------------------------------------------------- | ---------------------------- | ---- |
| obj        | k-v对象        | Record<Raw, any>                                                      | -                            | 是   |
| customizer | 自定义转换规则 | {key: string; value: string} \| ((item: [string, any]) => ObjectType) | { key: 'id', value: 'name' } | 是   |

### select.formatObject

| 参数   | 说明           | 类型                   | 默认值 | 必填 |
| ------ | -------------- | ---------------------- | ------ | ---- |
| obj    | k-v对象        | Record<Raw, any>       | -      | 是   |
| format | 自定义转换规则 | Record<string, string> | -      | 是   |

### select.formatArray

| 参数   | 说明           | 类型                   | 默认值 | 必填 |
| ------ | -------------- | ---------------------- | ------ | ---- |
| list   | k-v对象数组    | Record<Raw, any>[]     | -      | 是   |
| format | 自定义转换规则 | Record<string, string> | -      | 是   |

### select.formatArrayOrObject

| 参数   | 说明                   | 类型                                   | 默认值 | 必填 |
| ------ | ---------------------- | -------------------------------------- | ------ | ---- |
| objs   | k-v对象 或 k-v对象数组 | Record<Raw, any> \| Record<Raw, any>[] | -      | 是   |
| format | 自定义转换规则         | Record<string, string>                 | -      | 是   |

### select.transformSelect

| 参数    | 说明              | 类型                | 默认值 | 必填 |
| ------- | ----------------- | ------------------- | ------ | ---- |
| options | select数据options | [k: string]: any}[] | -      | 是   |
| key     | key               | string              | id     | 是   |
| name    | name              | string              | name   | 是   |

### toArrByPath

| 参数 | 说明     | 类型                | 默认值 | 必填 |
| ---- | -------- | ------------------- | ------ | ---- |
| arr  | any[]    | [k: string]: any}[] | -      | 是   |
| path | 取值路径 | string              | id     | 是   |

### toArrByPathUnique

| 参数 | 说明     | 类型                | 默认值 | 必填 |
| ---- | -------- | ------------------- | ------ | ---- |
| arr  | any[]    | [k: string]: any}[] | -      | 是   |
| path | 取值路径 | string              | id     | 是   |

### toArrByPaths

| 参数 | 说明     | 类型                | 默认值 | 必填 |
| ---- | -------- | ------------------- | ------ | ---- |
| arr  | any[]    | [k: string]: any}[] | -      | 是   |
| path | 取值路径 | string[]              | id     | 是   |
