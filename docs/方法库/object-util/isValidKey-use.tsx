import '../base/AemPlus';
import React, { useState } from 'react';
import { ObjectUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { object: { a : 1, b: 2 }, key: "c" };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { key, object } = form.getFieldsValue();
    const rs = ObjectUtil.isValidKey(key, toJSON(object));
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'key  (参数1)', type: 'input', name: 'key' },
        { label: 'object (参数2)', type: 'codeEditorCard', name: 'object' },
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
