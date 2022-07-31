---
title: ObjectUtil
nav:
  title: 方法库
  order: 3
---

## ObjectUtil

### isValidKey
判断key在object内
```jsx | pure
ObjectUtil.isValidKey(key, object);
```
<code src="../examples/object/isValidKey-use.tsx" />

### getField
路径取值
```jsx | pure
ObjectUtil.getField(target, path);
```
<code src="../examples/object/getField-use.tsx" />

### setField
路径取值
```jsx | pure
ObjectUtil.setField(target, path, value);
```
<code src="../examples/object/setField-use.tsx" />

### some
obj中是否存在value
```jsx | pure
ObjectUtil.some(obj, path, value);
```
<code src="../examples/object/some-use.tsx" />

### pick
从obj中取出keys，返回新的obj
```jsx | pure
ObjectUtil.pick(obj, customizer);
```
<code src="../examples/object/pick-use.tsx" />

### omit
取反过滤 pick
```jsx | pure
ObjectUtil.omit(obj, customizer);
```
<code src="../examples/object/omit-use.tsx" />

### trim
遍历对象，value去空格或指定字符
```jsx | pure
ObjectUtil.trim(obj, [chars]);
```
<code src="../examples/object/trim-use.tsx" />

## API 

### isValidKey

| 参数   | 说明   | 类型                       | 默认值 | 必填 |
| ------ | ------ | -------------------------- | ------ | ---- |
| key    | key    | string \| number \| symbol | -      | 是   |
| object | object | object                     | -      | 是   |


### setValue

| 参数   | 说明     | 类型                         | 默认值 | 必填 |
| ------ | -------- | ---------------------------- | ------ | ---- |
| target | 目标对象 | Record<string, any> \| any[] | -      | 是   |
| key    | key      | string                       | -      | 是   |
| value  | value    | string                       | -      | 是   |

### getField

| 参数   | 说明     | 类型          | 默认值                 | 必填 |
| ------ | -------- | ------------- | ---------------------- | ---- |
| target | 目标对象 | Record<string | number, any> \| string | -    | 是
| path   | 路径     | string        | -                      | 是   |

### getField

| 参数   | 说明     | 类型          | 默认值                 | 必填 |
| ------ | -------- | ------------- | ---------------------- | ---- |
| target | 目标对象 | Record<string | number, any> \| string | -    | 是
| path   | 路径     | string        | -                      | 是   |
| value  | 值       | any           | -                      | 是   |

### some

| 参数  | 说明             | 类型                                    | 默认值 | 必填 |
| ----- | ---------------- | --------------------------------------- | ------ | ---- |
| obj   | 目标对象         | Record<string \| number, any> \| string | -      | 是   |
| paths | 路径或自定义方法 | string[] \| ((val: any) => boolean)     | -      | 是   |
| value | 值               | any                                     | -      | 否   |

### pick

| 参数       | 说明             | 类型                                    | 默认值 | 必填 |
| ---------- | ---------------- | --------------------------------------- | ------ | ---- |
| obj        | 目标对象         | Record<string \| number, any> \| string | -      | 是   |
| customizer | 路径或自定义方法 | string[] \| ((val: any) => boolean      | -      | 是   |

### omit

| 参数       | 说明             | 类型                                    | 默认值 | 必填 |
| ---------- | ---------------- | --------------------------------------- | ------ | ---- |
| obj        | 目标对象         | Record<string \| number, any> \| string | -      | 是   |
| customizer | 路径或自定义方法 | string[] \| ((val: any) => boolean      | -      | 是   |

### trim
```jsx | pure
<T extends ObjectType | ObjectType[]>( data: T, chars?: string ): T
```
| 参数  | 说明             | 类型   | 默认值 | 必填 |
| ----- | ---------------- | ------ | ------ | ---- |
| data  | 目标对象         | T      | -      | 是   |
| chars | 路径或自定义方法 | string | -      | 否   |
