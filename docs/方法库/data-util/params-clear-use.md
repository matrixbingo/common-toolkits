# params-clear

`根据实际情况清空数组对象或对象的属性,默认清空`


## 代码演示

### 基础用法
<code src="./params-clear-use" />


## API
```jsx | pure
DataUtil.params.clear(target);
```

### Params
```jsx | pure
(target: any, options: { customizer?: any[] | ((item: any) => boolean); exclude?: string[] } = { customizer: ['', undefined, null], exclude: [] })
```
| 参数    | 说明     | 类型   | 默认值 | 必填 |
| ------- | -------- | ------ | ------ | ---- |
| target  | 目标对象 | object | -      | 是   |
| options | 配置     | object | -      | 是   |

### options
| 参数       | 说明          | 类型                               | 默认值                | 必填 |
| ---------- | ------------- | ---------------------------------- | --------------------- | ---- |
| customizer | 清空的字段值  | any[]  \| ((item: any) => boolean) | ['', undefined, null] | 否   |
| exclude    | 排除的字段key | string                             | -                     | 否   |
