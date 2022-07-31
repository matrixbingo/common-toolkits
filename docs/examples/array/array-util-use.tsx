
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import { ArrayUtil } from 'common-toolkits';
import '../base/AemPlus';

const ArrayUtilDemo = () => {

  const onClick0 = () => {
    const list1 = [1, 2, 3, 4, 5];
    const  arr1 = [2, 4];

    const rs1 = ArrayUtil.omit(list1, arr1);
    console.log('ArrayUtil.omit---->', rs1)

    const rs2 = ArrayUtil.omit(list1, arr1, true);
    console.log('ArrayUtil.omit---->', rs2)
  }

  const onClick1 = () => {
    const list1 = [{id: 1, name: 'tom', age: 10, obj: {a:1, b: 2}}, {id: 2, name: 'jerry', age: 5, obj: {a:4, b: 3}}, {id: 3, name: 'dog', age: 11, obj: {5:1, b: 7}}];
    const arr1 = ['age', 'obj.b'];
    const rs1 = ArrayUtil.omit(list1, arr1);
    console.log('ArrayUtil.pick---->', rs1)
  }

  const onClick2 = () => {
    const list1 = [{id: 1, name: 'tom', age: 10, obj: {a:1, b: 2}}, {id: 2, name: 'jerry', age: 5, obj: {a:4, b: 3}}, {id: 3, name: 'dog', age: 11, obj: {5:1, b: 7}}];
    const arr1 = ['age', 'obj.b'];
    const rs1 = ArrayUtil.pick(list1, arr1);
    console.log('ArrayUtil.pick---->', rs1)
  }

  return (<>
    <Button onClick={onClick0} >ArrayUtil.omit</Button>
    <br />
    <Button onClick={onClick1} >ArrayUtil.omit</Button>
    <br />
    <Button onClick={onClick2} >ArrayUtil.pick</Button>
  </>)
};

export default ArrayUtilDemo;
