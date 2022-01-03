import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import { ObjectUtil } from 'common-toolkits';

const setField = () => {
  const target = { a: 'a' };
  const path = 'b';
  const item = 'abc';
  const rs1 = ObjectUtil.setField(target, path, item);
  console.log('ObjectUtil.setField---->', rs1);
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
