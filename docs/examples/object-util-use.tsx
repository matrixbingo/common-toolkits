import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import { ObjectUtil, DataUtil } from 'common-toolkits';
import { set } from 'lodash';

const setField = () => {
  const target = { a: 'a' };
  const path = 'b.dd';
  const item = 'abc';
  const path2 ='a.2.c.4';

  const rs1 = ObjectUtil.setField(target, path, item);
  const rs2 = ObjectUtil.setField(rs1, 'c', 3);
  const rs3 = ObjectUtil.setField(rs2, 'd.3', {aaa:22});

  console.log('ObjectUtil.setField---->', rs3);

};

const mapKeys = () => {
  const target = { a: 'a', b: 'b' };
  const customizer = { a: 'aa', b: 'ccsdsd' };
  const rs1 = ObjectUtil.mapKeys(target, customizer);
  console.log('ObjectUtil.mapKeys---->', rs1);
};

const ObjectUtilDemo = () => {
  return (
    <>
      <Button onClick={setField}>ObjectUtil.setField</Button>
      <Button onClick={mapKeys}>ObjectUtil.mapKeys</Button>
    </>
  );
};

export default ObjectUtilDemo;
