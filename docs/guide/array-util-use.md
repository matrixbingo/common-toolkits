---
title: ArrayUtil
nav:
  title: 方法库
  order: 3
---

## ArrayUtil

### assign
给对象数组的每一个对象添加属性
```jsx | pure
ArrayUtil.assign(arr, item);
```
<code src="../examples/array/assign-use" />

### compareIntersection
计算两个集合的交集，给name添加boolean值
```jsx | pure
ArrayUtil.compareIntersection(arr, list, { path: 'labelCode', name: 'checked', useList: true });
```
### filterItemByPath

根据path对应的value，从arr里查找
```jsx | pure
ArrayUtil.filterItemByPath(arr, path, value)
```
<code src="../examples/array/filterItemByPath-use" />

### filterItemListByPaths
根据path的对应的value集合，从arr里查找
```jsx | pure
ArrayUtil.filterItemListByPaths(arr, path, values)
```
<code src="../examples/array/filterItemListByPaths-use" />

### includes
判断是否在列表内
```jsx | pure
ArrayUtil.includes(arr, fun);
```
<code src="../examples/array/includes-use" />

### initArray
创建并初始化一个新数组
```jsx | pure
ArrayUtil.initArray(number, value);
```
<code src="../examples/array/initArray-use" />

### isNotEmpty
判断数组不为空
```jsx | pure
ArrayUtil.isNotEmpty(arr);
```

### mapByKey
判断数组不为空
```jsx | pure
ArrayUtil.mapByKey(arr, value);
```
<code src="../examples/array/mapByKey-use" />

### merge
给对象数组的每一个对象merge属性
```jsx | pure
ArrayUtil.merge(arr, item);
```
<code src="../examples/array/merge-use" />

### omit
取补集，可自定义取，如果index为true则取下标的补集, 且如果index为true则customizer 必须是数组
```jsx | pure
ArrayUtil.omit(list, arr, [index]);
```
<code src="../examples/array/omit-use" />

### pick
取子集，可自定义取，如果index为true则取下标的子集, 且如果index为true则customizer 必须是数组 注意：数组中有对象暂不处理
```jsx | pure
ArrayUtil.pick(list, arr, [index]);
```
<code src="../examples/array/pick-use" />

### push
默认简单类型,customizer是默认对简单类型去重的方法
```jsx | pure
ArrayUtil.push(arr, ele, [customizer]);
```
<code src="../examples/array/push-use" />

### pushByIndex
默认简单类型,customizer是默认对简单类型去重的方法
```jsx | pure
ArrayUtil.pushByIndex(arr, index, item);
```
<code src="../examples/array/pushByIndex-use" />

### remove
删除指定值,customizer是默认对简单类型删除
```jsx | pure
ArrayUtil.remove(arr, customizer);
```
<code src="../examples/array/remove-use" />

### removeByIndex
删除指定值,customizer是默认对简单类型删除
```jsx | pure
ArrayUtil.removeByIndex(arr, customizer);
```

### unique
删除指定值,customizer是默认对简单类型删除
```jsx | pure
ArrayUtil.unique(arr, customizer);
```
<code src="../examples/array/unique-use" />


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

### mapByKey

```jsx | pure
(list: { [K: string]: any }[], k = 'id')
```
| 参数 | 说明 | 类型             | 默认值 | 必填 |
| ---- | ---- | ---------------- | ------ | ---- |
| list | 数组 | [K: string]: any | -      | 是   |
| k    | 键值 | string           | -      | 否   |

### merge
```jsx | pure
<T, S>(arr: T[], item: S): T[]
```
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| ---- | ---- | ---- | ------ | ---- |
| arr  | 数组 | T[]  | -      | 是   |
| item | 对象 | S    | -      | 是   |

### omit
```jsx | pure
<T extends Raw | Record<any, any>>( list: T[], customizer: any[] | ((val: T) => boolean), index = false ): Array<T> 
```
| 参数       | 说明             | 类型                         | 默认值 | 必填 |
| ---------- | ---------------- | ---------------------------- | ------ | ---- |
| list       | 数组             | T[]                          | -      | 是   |
| customizer | 数组或方法       | any[] 或 (val: T) => boolean | -      | 是   |
| index      | 是否使用数组下标 | boolean                      | false  | 否   |

### pick
```jsx | pure
<T extends Raw | ObjectType>( list: T[], customizer: any[] | ((val: T) => boolean), index = false ): Array<T> 
```
| 参数       | 说明             | 类型                         | 默认值 | 必填 |
| ---------- | ---------------- | ---------------------------- | ------ | ---- |
| list       | 数组             | T[]                          | -      | 是   |
| customizer | 数组或方法       | any[] 或 (val: T) => boolean | -      | 是   |
| index      | 是否使用数组下标 | boolean                      | false  | 否   |

### push
```jsx | pure
<T extends Raw | ObjectType>( arr: T[], ele: T, customizer?: (item: T) => boolean ): T[]
```
| 参数       | 说明       | 类型                 | 默认值                   | 必填 |
| ---------- | ---------- | -------------------- | ------------------------ | ---- |
| arr        | 数组       | T[]                  | -                        | 是   |
| ele        | 元素       | any                  | -                        | 是   |
| customizer | 自定义方法 | (item: T) => boolean | arr.indexOf(ele) === -1) | 否   |

### pushByIndex
```jsx | pure
( arr: { [x: string]: any[] }, index: string | number, item: string ): { [x: string]: any[] } 
```
| 参数  | 说明   | 类型 | 默认值 | 必填 |
| ----- | ------ | ---- | ------ | ---- |
| arr   | 数组   | T[]  | -      | 是   |
| index | 下标值 | int  | -      | 是   |
| item  | 值     | any  | -      | 否   |

### remove
```jsx | pure
<T extends Raw | ObjectType>( arr: T[], customizer: T | ((val: T) => boolean) ): Array<T> 
```
| 参数       | 说明           | 类型 | 默认值               | 必填 |
| ---------- | -------------- | ---- | -------------------- | ---- |
| arr        | 数组           | T[]  | -                    | 是   |
| customizer | 值或自定义方法 | T    | (val: T) => boolean) | -    | 是   


### unique
```jsx | pure
<T>(arr: T[], customizer?: (val: T) => string): Array<T>
```
| 参数       | 说明       | 类型 | 默认值              | 必填 |
| ---------- | ---------- | ---- | ------------------- | ---- |
| arr        | 数组       | T[]  | -                   | 是   |
| customizer | 自定义方法 | T    | (val: T) => any) | -    | 否   
