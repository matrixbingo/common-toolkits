# result.setDefaultValue

`对查询结果缺失的部分设置默认值`


## 代码演示

### 基础用法
<code src="./result-setDefaultValue-use.tsx" />


## API
```jsx | pure
DataUtil.result.setDefaultValue(data, format);
```

### Params

```jsx | pure
( data: Record<string, string> | Array<Record<string, string>>, format: Record<string, any> ): Record<string, string> | Array<Record<string, string>> 
```
| 参数   | 说明 | 类型                                          | 默认值                        | 必填 |
| ------ | ---- | --------------------------------------------- | ----------------------------- | ---- |
| data   | 数组 | Record<string, string>                        \| Array<Record<string, string>> | -    | 是   
| format | 对象 | Record<string, any> ): Record<string, string> | -                             | 是   |
