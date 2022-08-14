
import React, { useState } from 'react';
import { NumberUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { num: 10.43434567, format: '0.00'};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { num, format } = form.getFieldsValue();
    const rs = NumberUtil.format(num, format);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'num   (参数1)', type: 'input', name: 'num' },
        { label: 'format   (参数2)', type: 'input', name: 'format' },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
          ],
        },
      ]}
    </YForm>
    <div>结果:{result}</div>
  </CollapsibleCard>)
};

export default Demo;
