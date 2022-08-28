import '../base/AemPlus';
import React, { useState } from 'react';
import { ObjectUtil } from 'common-toolkits';
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { object1: { a : 1, b: { c: [{ a: 2 }, { d: 'd' }]} }, object2: { a : 1, b: { c: [{ a: 2 }, { d: 'd' }]} } };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { object1, object2 } = form.getFieldsValue();
    const obj1 = toJSON(object1);
    const obj2 = toJSON(object2);

    window.console.log('---------------->', obj1, obj2);
    const rs = ObjectUtil.equals(obj1, obj2);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={false}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'obj1 (参数1)', type: 'codeEditorCard', name: 'object1' },
        { label: 'obj2 (参数2)', type: 'codeEditorCard', name: 'object2' },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
            { type: 'button', componentProps: { children: '重置', onClick: reset } },
          ],
        },
      ]}
    </YForm>
    <div>结果:{JSON.stringify(result)}</div>
  </CollapsibleCard>)
};

export default Demo;
