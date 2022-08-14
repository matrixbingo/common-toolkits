# params-extends

`给参数添加属性值`


## 代码演示

### 基础用法
<code src="./params-extends-use.tsx" />


## API
```jsx | pure
DataUtil.params.extends(target);
```

### Params
```jsx | pure
( param: Record<string | number, any>, args: { need?: (item: Record<string | number, any>) => boolean; item: Record<string | number, any> }[]): Record<string | number, any>
```
| 参数  | 说明     | 类型   | 默认值 | 必填 |
| ----- | -------- | ------ | ------ | ---- |
| param | 目标对象 | object | -      | 是   |
| args  | 配置     | object | -      | 是   |

### args
| 参数 | 说明 | 类型                                                                                             | 默认值 | 必填 |
| ---- | ---- | ------------------------------------------------------------------------------------------------ | ------ | ---- |
| need | 配置 | { need?: (item: Record<string \| number, any>) => boolean; item: Record<string \| number, any> } | 否     |      |
