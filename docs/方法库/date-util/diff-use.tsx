
import React, { useState } from 'react';
import { DateUtil, FormatDate, Period } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';

const initialValues = { beginDate: '2022-01-14 14:58:41', endDate: '2022-01-14 14:58:41' };

const options = [
  { id: FormatDate.SECONDS_FORMAT, name: FormatDate.SECONDS_FORMAT },
  { id: FormatDate.SECONDS, name: FormatDate.SECONDS },
  { id: FormatDate.DAY_FORMAT, name: FormatDate.DAY_FORMAT },
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<string>(FormatDate.SECONDS_FORMAT);

  const onClick = () => {
    const { beginDate, endDate } = form.getFieldsValue();
    const rs = DateUtil.diff(beginDate, endDate, Period.day);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
    resetMod();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'beginDate (参数1)', type: 'datePickerFormat', name: 'beginDate', componentProps: { format: 'YYYY-MM-DD HH:mm:ss', showTime: true } },
        { label: 'endDate   (参数2)', type: 'datePickerFormat', name: 'endDate', componentProps: { format: 'YYYY-MM-DD HH:mm:ss', showTime: true } },
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
