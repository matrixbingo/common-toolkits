
import React, { useState } from 'react';
import { FormatUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { num: 100000 };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { num } = form.getFieldsValue();
    const rs = FormatUtil.thousands(num);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'num (参数1)', type: 'input', name: 'num' },
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
