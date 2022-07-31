---
title: useIntervalDelay
group:
  title: Effect
  path: /effect
nav:
  title: hooks
  path: /hooks
  order: 3
---

# useIntervalDelay

间隔delay毫秒运行，直到满足close条件，运行一次fn

## 代码演示


## API

```typescript
useIntervalDelay = ( () => {}, { close: () => true; delay: 2000  } )
```

## Params

| 参数 | 说明                 | 类型       | 默认值 |
| ---- | -------------------- | ---------- | ------ |
| fn   | 需要被执行的回调函数 | () => void | -      |
| options | 配置项               | { close: () => boolean; delay?: number }      | -      |
