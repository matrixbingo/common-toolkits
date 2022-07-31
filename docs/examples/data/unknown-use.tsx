
import React, { useState } from 'react';
import { DataUtil } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { value: '1'};

const options = [
  { id: 'isInt', name: 'isInt' },
  { id: 'isPeInt', name: 'isPeInt' },
  { id: 'isNeInt', name: 'isNeInt' },
  { id: 'isFloat', name: 'isFloat' },
  { id: 'isJSON', name: 'isJSON' },
  { id: 'parseValue', name: 'parseValue' },
  { id: 'isVoid', name: 'isVoid' },
  { id: 'isFalsy', name: 'isFalsy' },
  { id: 'isValue', name: 'isValue' }
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<string>('isInt');

  const onClick = () => {
    const { value } = form.getFieldsValue();
    const rs = DataUtil.unknown[mode]?.(value);
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
        { label: '方法名', type: 'select', name: 'select', componentProps: { options, defaultValue: 'isInt', onSelect:seTMod } },
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
