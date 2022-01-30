
import React, { useState } from 'react';
import { DataUtil, useResetState } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { value: '1'};

const options = [
  { id: 'getInt', name: 'getInt' },
  { id: 'getFloat', name: 'getFloat' },
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<string>('getInt');

  const onClick = () => {
    const { value } = form.getFieldsValue();
    const rs = DataUtil.input[mode]?.(value);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
    resetMod();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'value (参数1)', type: 'input', name: 'value' },
        { label: '方法名', type: 'select', name: 'select', componentProps: { options, defaultValue: 'getInt', onSelect:seTMod } },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
            { type: 'button', componentProps: { children: '重置', onClick: reset } },
          ],
        },
      ]}
    </YForm>
    <div>结果:{String(result)}</div>
  </CollapsibleCard>)
};

export default Demo;
