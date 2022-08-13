
import React from 'react';
import { Button} from 'antd';
import { ArrayUtil } from 'common-toolkits';
import '../base/AemPlus';

const ArrayUtilDemo = () => {

  const onClick2 = () => {
    const list1 = [{id: 1, name: 'tom', age: 10, obj: {a:1, b: 2}}, {id: 2, name: 'jerry', age: 5, obj: {a:4, b: 3}}, {id: 3, name: 'dog', age: 11, obj: {5:1, b: 7}}];
    const arr1 = ['age', 'obj.b'];
    const rs1 = ArrayUtil.pick(list1, arr1);
    console.log('ArrayUtil.pick---->', rs1)
  }

  return (<>
    <Button onClick={onClick2} >ArrayUtil.pick</Button>
  </>)
};

export default ArrayUtilDemo;
