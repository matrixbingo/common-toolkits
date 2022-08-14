# pick

`从obj中取出keys，返回新的obj`


## 代码演示

### 基础用法
<code src="./pick-use.tsx" />

## API
```jsx | pure
ObjectUtil.pick(obj, customizer);
```

### Params

| 参数       | 说明             | 类型                                    | 默认值 | 必填 |
| ---------- | ---------------- | --------------------------------------- | ------ | ---- |
| obj        | 目标对象         | Record<string \| number, any> \| string | -      | 是   |
| customizer | 路径或自定义方法 | string[] \| ((val: any) => boolean      | -      | 是   |
