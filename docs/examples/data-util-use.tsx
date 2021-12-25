
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import 'antd/dist/antd.css';
import { DataUtil } from 'common-toolkits';

const DataUtilDemo = () => {

  const onClick0 = () => {
    const param = {a:1};
    const  args = [{customizer: () => true, item: {a:2, c:3, aa:{a:1}} }, {customizer: () => true, item: {v: 5, g:7, aa:{v:2}} }];
    const rs1 = DataUtil.params.extends(param, args);
    console.log('DataUtil.params.extends ---->', rs1)
  }

  return (<>
    <Button onClick={onClick0} >DataUtil.params.extends</Button>
  </>)
};

export default DataUtilDemo;