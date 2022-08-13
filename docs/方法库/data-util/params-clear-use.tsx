
import React, { useState } from 'react';
import { DataUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { arr: [{a: '', b: null, c: 455}, {c: undefined, d: 123}], item: { customizer: ['', 455, null], exclude: [] }};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { arr, item } = form.getFieldsValue();
    const rs = DataUtil.params.clear(toJSON(arr), toJSON(item));
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'param        (参数1)', type: 'codeEditorCard', name: 'arr' },
        { label: 'customizer  (参数2)', type: 'codeEditorCard', name: 'item' },
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
