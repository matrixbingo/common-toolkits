import '../base/AemPlus';
import React, { useState } from 'react';
import { ObjectUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { object: { a : 1, b: { c: [{ a: 2 }]}, d: 'd' }, customizer: ["a"]};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { object, customizer } = form.getFieldsValue();
    const rs = ObjectUtil.omit(toJSON(object), customizer);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'target     (参数1)', type: 'codeEditorCard', name: 'object' },
        { label: 'customizer (参数2)', type: 'codeEditorCard', name: 'customizer' },
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
