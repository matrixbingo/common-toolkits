
import React, { useState } from 'react';
import { DateUtil, FormatDate } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { useMount } from 'ahooks';

const initialValues = { format: FormatDate.DAY_FORMAT };

const options = [
  { id: FormatDate.DAY_FORMAT, name: FormatDate.DAY_FORMAT },
  { id: FormatDate.SECONDS_FORMAT, name: FormatDate.SECONDS_FORMAT },
  { id: FormatDate.SECONDS, name: FormatDate.SECONDS },
];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<string>(FormatDate.DAY_FORMAT);

  useMount(() => {
    form.setFieldValue('format', FormatDate.DAY_FORMAT);
    const rs = DateUtil.currFormat(FormatDate.DAY_FORMAT);
    setResult(rs);
  });

  const onClick = () => {
    const { format } = form.getFieldsValue();
    const rs = DateUtil.workday(format);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
    resetMod();
  }

  const onSelect = (v) => {
    seTMod(v);
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'value (参数1)', type: 'select', name: 'format', componentProps: { options, defaultValue: FormatDate.SECONDS_FORMAT, onSelect } },
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
