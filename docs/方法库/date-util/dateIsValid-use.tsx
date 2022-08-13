
import React, { useState } from 'react';
import { DateUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { date: '2005-02-12', format: 'YYYY-MM-DD'};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { date, format } = form.getFieldsValue();
    const rs = DateUtil.dateIsValid(date, format);
    setResult(rs);
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'date (参数1)', type: 'input', name: 'date' },
        { label: 'beginDate (参数2)', type: 'input', name: 'format' },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
          ],
        },
      ]}
    </YForm>
    <div>结果:{String(result)}</div>
  </CollapsibleCard>)
};

export default Demo;
