import React, { useState } from 'react';
import { createContainer } from 'common-toolkits';
import { Button, Input, Row} from 'antd';
import 'antd/dist/antd.css';

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

const UserList = () => {
  const { store: { editor }, handle } = useUserContext();
  const [value, setValue] = useState('');

  const onClick = () => {
    handle.save('editor.item.name', value);
  }
  
  return <>
    <Row>{editor.visible}</Row>
    <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }} value={value} onChange={(e) => setValue(e.target.value)}/>
      <Button type="primary" onClick={onClick}>Submit</Button>
    </Input.Group>
  </>
}

const UserEditor = () => {
  const { store: { editor }, handle } = useUserContext();

  const onClick = () => {
    handle.save('editor.visible', !editor.visible);
  }
  
  return <>
    <Button type="primary" onClick={onClick}>Submit</Button>
    {JSON.stringify(editor)}
  </>
}

const UserManager: React.FC = () => {

  return (
    <ContainerUser>
      <UserList />
      <br/>
      <UserEditor />
    </ContainerUser>
  )
};

export default UserManager;