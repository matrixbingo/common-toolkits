# some

`obj中是否存在value`


## 代码演示

### 基础用法
<code src="./some-use" />

## API
```jsx | pure
ObjectUtil.some(obj, path, value);
```

### Params

| 参数  | 说明             | 类型                                    | 默认值 | 必填 |
| ----- | ---------------- | --------------------------------------- | ------ | ---- |
| obj   | 目标对象         | Record<string \| number, any> \| string | -      | 是   |
| paths | 路径或自定义方法 | string[] \| ((val: any) => boolean)     | -      | 是   |
| value | 值               | any                                     | -      | 否   |
