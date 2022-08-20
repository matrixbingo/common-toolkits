import React, { useState } from 'react';
import { FormatUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { isString } from 'lodash';
import ReactJson from 'react-json-view';

const oldfn = (value: any) =>
  isString(value)
    ? JSON.stringify(JSON.parse(value), null, 2)
    : JSON.stringify(value, null, 2);


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

const initialValues = { value };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClickOld = () => {
    const { value } = form.getFieldsValue();
    const rs = oldfn(value);
    setResult(JSON.parse(rs));
  }

  const onClick = () => {
    const { value } = form.getFieldsValue();
    const rs = FormatUtil.json(value);
    setResult(JSON.parse(rs));
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'num   (参数1)', type: 'codeEditorCard', name: 'value' },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: 'jsonOld', type: 'primary', onClick: onClickOld} },
            { type: 'button', componentProps: { children: 'json', type: 'primary', onClick } },
            { type: 'button', componentProps: { children: '重置', onClick: reset } },
          ],
        },
      ]}
    </YForm>
    <ReactJson theme="monokai" src={result} />
  </CollapsibleCard>)
};

export default Demo;
