# omit

`取反过滤 pick`


## 代码演示

### 基础用法
<code src="./omit-use" />

## API
```jsx | pure
ObjectUtil.omit(obj, customizer);
```

### Params

| 参数       | 说明             | 类型                                    | 默认值 | 必填 |
| ---------- | ---------------- | --------------------------------------- | ------ | ---- |
| obj        | 目标对象         | Record<string \| number, any> \| string | -      | 是   |
| customizer | 路径或自定义方法 | string[] \| ((val: any) => boolean      | -      | 是   |
