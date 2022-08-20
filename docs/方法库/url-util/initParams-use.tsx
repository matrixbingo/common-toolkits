
import React, { useState } from 'react';
import { UrlUtil } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { data: {id: 'a1', name: 'n1'}, first: true };

const options = [
  { id: true, name: 'true' },
  { id: false, name: 'false' },
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<string>(true);

  const onClick = () => {
    const { data, first } = form.getFieldsValue();
    const rs = UrlUtil.initParams(toJSON(data), first);
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
        { label: 'data  (参数1)', type: 'codeEditorCard', name: 'data' },
        { label: 'first (参数2)', type: 'select', name: 'first', componentProps: { options }, rules:[{ required: false} ] },
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
