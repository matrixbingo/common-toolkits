
import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { DataUtil } from 'common-toolkits';

const DataUtilDemo = () => {

  const onClick0 = () => {
    const param = {a:1};
    const  args = [{customizer: () => true, item: {a:2, c:3, aa:{a:1}} }, {customizer: () => true, item: {v: 5, g:7, aa:{v:2}} }];
    const rs1 = DataUtil.params.extends(param, args);
    console.log('DataUtil.params.extends ---->', rs1)
  }

  const onClick1 = () => {
    const param = {a:1, b: { bb:'', c: undefined, d: null, e: 'ee' }, c: null, d: undefined, e: 'asasas', f: ''};
    const rs1 = DataUtil.params.clear(param);
    const rs2 = DataUtil.params.clear(param, [null]);
    const rs3 = DataUtil.params.clear(param, (i) => i === undefined);
    const arr = [param, param, param];
    const rs4 = DataUtil.params.clear(arr);
    console.log('DataUtil.params.clear ---->', rs1, rs2, rs3, rs4)
  }

  return (<>
    <Button onClick={onClick0} >DataUtil.params.extends</Button>
    <br />
    <Button onClick={onClick1} >DataUtil.params.clear</Button>
  </>)
};

export default DataUtilDemo;