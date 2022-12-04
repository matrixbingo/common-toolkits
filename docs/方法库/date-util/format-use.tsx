
import React, { useState } from 'react';
import { DateUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { date: '2005-02-12', formatInt: 'YYYY-MM-DD', formatOut: 'YYYYMMDD'};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { date, formatInt, formatOut } = form.getFieldsValue();
    const rs = DateUtil.format(date, formatInt, formatOut);
    setResult(rs);
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[

        { label: 'value (参数1)', type: 'input', name: 'date' },
        { label: 'formatInt (参数2)', type: 'input', name: 'formatInt' },
        { label: 'formatOut (参数3)', type: 'input', name: 'formatOut' },
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
