
import React, { useState } from 'react';
import { TransformUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../../base/util';

const initialValues = { obj: { a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }, item: {value: "a", label: "c.c1"}};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { obj, item } = form.getFieldsValue();
    const rs = TransformUtil.select.formatObject(toJSON(obj), toJSON(item));
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'obj    (参数1)', type: 'codeEditorCard', name: 'obj' },
        { label: 'format (参数2)', type: 'codeEditorCard', name: 'item' },
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
