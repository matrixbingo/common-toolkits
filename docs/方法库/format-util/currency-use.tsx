
import React, { useState } from 'react';
import { FormatUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { num: 10000.4567, precision: 2, separator: ','};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { num, precision, separator } = form.getFieldsValue();
    const rs = FormatUtil.currency(num, precision, separator);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'num   (参数1)', type: 'input', name: 'num' },
        { label: 'precision  (参数2)', type: 'inputStringNumber', name: 'precision' },
        { label: 'separator  (参数3)', type: 'input', name: 'separator' },
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
