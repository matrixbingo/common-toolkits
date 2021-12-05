
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import 'antd/dist/antd.css';
import { ArrayUtil } from 'common-toolkits';

const list1 = [1, 2, 3, 4, 5];
const  arr1 = [2, 4];

const rs1 = ArrayUtil.omit(list1, arr1);

const ArrayUtilDemo = () => {

  const onClick = () => {
    console.log('ArrayUtil.omit---->', rs1)
  }

  return (<>
    <Button onClick={onClick} >ArrayUtil.omit</Button>
  </>)
};

export default ArrayUtilDemo;