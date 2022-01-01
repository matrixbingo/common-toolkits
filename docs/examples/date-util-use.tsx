import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import 'antd/dist/antd.css';
import { DateUtil, Period } from 'common-toolkits';

const DateUtilDemo = () => {
  const onClick0 = () => {
    const day = DateUtil.range<string>(Period.day, { rang: [14, 0] });
    console.log(' DateUtil.range ---->', day);

    const week = DateUtil.range<string>(Period.isoWeek, { rang: [2, 0] });
    console.log(' DateUtil.range ---->', week);

    const month = DateUtil.range<string>(Period.month);
    console.log(' DateUtil.range ---->', month);
  };

  return (
    <>
      <Button onClick={onClick0}>DateUtil.range</Button>
    </>
  );
};

export default DateUtilDemo;
