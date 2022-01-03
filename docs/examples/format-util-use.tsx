import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import { FormatUtil } from 'common-toolkits';
import { isString } from 'lodash';

const value = {
  xField: 'year',
  yField: 'value',
  seriesField: 'category',
  yAxis: {
    label: {
      // 数值格式化为千分位
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
  },
  color: 'COLOR_PLATE_10',
  point: {
    shape: ({ category }) => {
      return category === 'Gas fuel' ? 'square' : 'circle';
    },
    style: ({ year }) => {
      return {
        r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
      };
    },
  },
};

const oldfn = (value: any) =>
  isString(value)
    ? JSON.stringify(JSON.parse(value), null, 2)
    : JSON.stringify(value, null, 2);

const jsonOld = () => {
  const old = oldfn(value);
  console.log('FormatUtil.jsonOld ---->', old);
};

const json = () => {
  const rs = FormatUtil.json(value);
  console.log('FormatUtil.json ---->', rs);
};

const Demo = () => {
  return (
    <>
      <Button onClick={jsonOld}>jsonOld</Button>
      <br />
      <Button onClick={json}>FormatUtil.json</Button>
    </>
  );
};

export default Demo;
