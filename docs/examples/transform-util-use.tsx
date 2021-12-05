
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import 'antd/dist/antd.css';
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
    const rs2 = TransformUtil.select.formatObject(object1, format3)
    console.log('TransformUtil.select.formatObject---->', rs2)
  }

  return (<>
    <Button onClick={onClick1} >TransformUtil.select.formatArray</Button>
    <br/>
    <Button onClick={onClick2} >TransformUtil.select.formatObject</Button>
  </>)
};

export default ArrayUtilDemo;