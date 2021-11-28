---
title: 快速上手
order: 9
nav:
  order: 10
---

# 快速上手

## 安装

在项目目录下执行以下命令进行安装：

```bash
$ yarn add common-toolkits
```

## 示例

```jsx | pure

import React from 'react';
import { createContainer } from 'common-toolkits';

const defaultStore = {
  editor: {
    visible: false,
    loading: false,
    title: '新增',
    item: {
      id: '',
      name: '',
      list: [],
    }
  },
}

const [[ContainerUser], useUserContext, useUserStore] = createContainer(defaultStore);

const UserManager: React.FC = () => {
  return (
    <ContainerUser>
      <div>...</div>
    </ContainerUser>
  )
};

export default UserManager;

```
