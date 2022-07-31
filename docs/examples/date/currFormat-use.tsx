
import React, { useState } from 'react';
import { DateUtil, FormatDate } from 'common-toolkits';
import { useResetState } from '@common-toolkits/hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { value: FormatDate.SECONDS_FORMAT, format: FormatDate.SECONDS_FORMAT };

const options = [
  { id: FormatDate.SECONDS_FORMAT, name: FormatDate.SECONDS_FORMAT },
  { id: FormatDate.SECONDS, name: FormatDate.SECONDS },
  { id: FormatDate.DAY_FORMAT, name: FormatDate.DAY_FORMAT },
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<string>(FormatDate.SECONDS_FORMAT);


  const onClick = () => {
    const { value } = form.getFieldsValue();
    const rs = DateUtil.currFormat(value);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
    resetMod();
  }

  const onSelect = (v) => {
    seTMod(v);
    form.setFieldsValue({'value': v});
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'value (参数1)', type: 'input', name: 'value' },
        { label: 'value (参数1)', type: 'select', name: 'format', componentProps: { options, defaultValue: FormatDate.SECONDS_FORMAT, onSelect } },
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
