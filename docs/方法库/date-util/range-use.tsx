
import React, { useState } from 'react';
import { DateUtil, Period } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { value: '1'};

const options = [
  { id: Period.day, name: 'day' },
  { id: Period.week, name: 'week' },
  { id: Period.month, name: 'month' },
  { id: Period.quarter, name: 'quarter' },
  { id: Period.year, name: 'year' },
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<Period>(Period.day);

  const onClick = () => {
    const { value } = form.getFieldsValue();
    const rs = DateUtil.range(mode);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
    resetMod();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: '参数1', type: 'select', name: 'select', componentProps: { options, defaultValue: Period.day, onSelect:seTMod } },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
            { type: 'button', componentProps: { children: '重置', onClick: reset } },
          ],
        },
      ]}
    </YForm>
    <ReactJson theme="monokai" src={result} />
  </CollapsibleCard>)
};

export default Demo;
