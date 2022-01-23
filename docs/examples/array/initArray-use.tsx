
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { number: 1 };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { number, value} = form.getFieldsValue();
    const arr = ArrayUtil.initArray(number as number, value);
    setResult(arr);
  }

  const reset = () => {
    form.resetFields();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        {
          type: 'space',
          items: [
            { label: 'number (参数1)', type: 'inputStringNumber', name: 'number' },
            { label: 'value  (参数2)', type: 'input', name: 'value', rules: [{ required: false }] },
          ],
        },
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
