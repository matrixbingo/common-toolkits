---
title: useResetState
group:
  title: State
  path: /state
nav:
  title: hooks
  path: /hooks
  order: 3
---

# useResetState

可恢复初始状态

## API

```typescript
const [state, setState, resetState] = useResetState(0);
```

## 代码演示

```tsx
import React, { useState } from 'react';
import { useResetState } from 'common-toolkits-hooks';
import { Button, Space } from 'antd';
import 'antd/dist/antd.css';

export default () => {
  const [state, setState, resetState] = useResetState(0);

  return (
    <Space>
      <Button>当前：{state}</Button>
      <Button type="primary" onClick={() => setState(state + 1)}>
        +
      </Button>
      <Button onClick={() => resetState()}>重置</Button>
    </Space>
  );
};
```


