# type

`类型相关方法库`


## 代码演示
<code src="./type-util-use" />

### 基础用法
```jsx | pure
TypeUtil.isInt();       // 是否int，包含字符串
```
```jsx | pure
TypeUtil.isPeInt();     // 正整数，不包含0
```
```jsx | pure
TypeUtil.isNeInt();     // 负整数，不包含0
```
```jsx | pure
TypeUtil.isFloat();
```
```jsx | pure
TypeUtil.isJSON();      // 包含字符串
```
```jsx | pure
TypeUtil.parseValue();  //如果是字符串数字则转换成数字，可用于 select, checkbox, radio等转格式
```
```jsx | pure
TypeUtil.isVoid();
```
```jsx | pure
TypeUtil.isFalsy();
```
```jsx | pure
TypeUtil.isColor();
```
