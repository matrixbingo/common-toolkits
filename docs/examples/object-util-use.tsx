
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import { ObjectUtil } from 'common-toolkits';

const ObjectUtilDemo = () => {

  const onClick = () => {
    const target = {a:'a'};
    const path = 'b';
    const item = 'abc'
    const rs1 = ObjectUtil.setField(target, path, item);
    console.log('ObjectUtil.setField---->', rs1)
  }

  return (<>
    <Button onClick={onClick} >ObjectUtil.setField</Button>
  </>)
};

export default ObjectUtilDemo;