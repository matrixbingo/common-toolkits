---
title: array-util
nav:
  title: 指南
  order: 3
---

## ArrayUtil

### assign
给对象数组的每一个对象添加属性
<code src="../examples/array/assign-use" />

### filterItemByPath

根据path对应的value，从arr里查找

<code src="../examples/array/filterItemByPath-use" />

### filterItemListByPaths
根据path的对应的value集合，从arr里查找
<code src="../examples/array/filterItemListByPaths-use" />

### includes
判断是否在列表内
<code src="../examples/array/includes-use" />

### initArray
创建并初始化一个新数组
<code src="../examples/array/initArray-use" />

### omit
<code src="../examples/array/array-util-use" />


## API 

### assign

```jsx | pure
<T, S>(arr: T[], item: S): T[]
```
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| arr  | 数组 | T[]  | -      | 是   |
| item | 对象 | S    | -      | 是   |

### filterItemByPath

```jsx | pure
<T>(arr: T[], path: string, value: any): T[]
```
| 参数  | 说明 | 类型   | 默认值 | 必填 |
| ----- | ---- | ------ | ------ | ---- |
| arr   | 数组 | T[]    | -      | 是   |
| path  | 路径 | string | -      | 是   |
| value | 值   | any    | -      | 是   |

### filterItemListByPaths

```jsx | pure
 <T>( arr: T[], path: string, values: any[] ): T[]
```
| 参数   | 说明 | 类型   | 默认值 | 必填 |
| ------ | ---- | ------ | ------ | ---- |
| arr    | 数组 | T[]    | -      | 是   |
| path   | 路径 | string | -      | 是   |
| values | 值   | any[]  | -      | 是   |

### includes

| 参数 | 说明 | 类型                   | 默认值 | 必填 |
| ---- | ---- | ---------------------- | ------ | ---- |
| arr  | 数组 | any[]                  | -      | 是   |
| fun  | 方法 | (item: any) => boolean | -      | 是   |

### initArray

```jsx | pure
<T>(length: number = 1, value: T): Array<T>
```
| 参数   | 说明     | 类型   | 默认值 | 必填 |
| ------ | -------- | ------ | ------ | ---- |
| number | 数组长度 | number | 1      | 是   |
| value  | 默认值   | T      | -      | 否   |

