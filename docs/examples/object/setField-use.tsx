import '../base/AemPlus';
import React, { useState } from 'react';
import { ObjectUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { object: { a : 1, b: { c: [{ a: 2 }, { d: 'd' }]} }, path: "b.c.1.d", value: 'sass'};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { path, object, value } = form.getFieldsValue();
    const rs = ObjectUtil.setField(toJSON(object), path, value);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'target (参数1)', type: 'codeEditorCard', name: 'object' },
        { label: 'path   (参数2)', type: 'input', name: 'path' },
        { label: 'value  (参数3)', type: 'input', name: 'value' },
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
