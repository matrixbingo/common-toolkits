
import React, { useState } from 'react';
import { Button, Input, Row} from 'antd';
import { UrlUtil } from 'common-toolkits';

const host = 'http://localhost:8000/zh-CN/guide/url-util/:id/:name/bb/cc:gg/index';


const ArrayUtilDemo = () => {

  const onClick1 = () => {
    const url = UrlUtil.pathVariable(host, {id:'21', name: 'tom', gg: 'dadad', code: 1245});
    console.log('UrlUtil.pathVariable---->', url)
  }

  return (<>
    <br/>
    <Button onClick={onClick1} > UrlUtil.pathVariable </Button>
  </>)
};

export default ArrayUtilDemo;