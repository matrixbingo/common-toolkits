
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import { TransformUtil } from 'common-toolkits';

const list1 = [{ a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }, { a: "AA", b: "BB", c: { c1: "C11", c2: "C12" } }];
const  format1 =  {value: "a", label: "c.c1"};

const object1 = { a: "aa", b: "bb", c: "cc" };
const  format2 =  {value: "label"};
const  format3 =  {label: "value"};

const ArrayUtilDemo = () => {

  const onClick1 = () => {
    const rs1 = TransformUtil.select.formatArray(list1, format1)
    console.log('TransformUtil.select.formatArray---->', rs1)
  }

  const onClick2 = () => {
    const obj = { a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } };
    const format0 =  {aa: "a", vv: "c.c1"};
    const rs2 = TransformUtil.select.formatObject(obj, format0)
    console.log('TransformUtil.select.formatObject---->', rs2)
  }

  const onClick3 = () => {
    const options = [{ id: '1', name: 'aa' },{ id: '2', name: 'bb' }];
    const rs2 = TransformUtil.select.transformSelect(options, 'id', 'name');
    console.log('TransformUtil.select.transformSelect---->', rs2)
  }

  return (<>
    <br/>
    <Button onClick={onClick1} >TransformUtil.select.formatArray</Button>
    <br/>
    <Button onClick={onClick2} >TransformUtil.select.formatObject</Button>
    <br/>
    <Button onClick={onClick3} >TransformUtil.select.transformSelect</Button>
  </>)
};

export default ArrayUtilDemo;