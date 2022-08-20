import '../base/AemPlus';
import React, { useState } from 'react';
import { ObjectUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { object: { a : 1, b: { c: [{ a: 2 }, { d: 'd' }]} }, path: "b.c.1.d"};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { path, object } = form.getFieldsValue();
    const rs = ObjectUtil.getField(toJSON(object), path);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'target (参数1)', type: 'codeEditorCard', name: 'object' },
        { label: 'path  (参数2)', type: 'input', name: 'path' },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
            { type: 'button', componentProps: { children: '重置', onClick: reset } },
          ],
        },
      ]}
    </YForm>
    <div>结果:{JSON.stringify(result)}</div>
  </CollapsibleCard>)
};

export default Demo;
