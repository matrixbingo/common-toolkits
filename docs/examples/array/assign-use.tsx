
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { arr: [{ a : 1, b: 2 }, { a : 11, b: 22 }], item: { c: 3} };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { arr, item } = form.getFieldsValue();
    const rs = ArrayUtil.assign(arr, item);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'arr  (参数1)', type: 'codeEditorCard', name: 'arr' },
        { label: 'item (参数2)', type: 'codeEditorCard', name: 'item' },
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
