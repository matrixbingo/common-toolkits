
import React, { useState } from 'react';
import { TransformUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../../base/util';

const initialValues = { list: [{ id: '1', name: 'aa' },{ id: '2', name: 'bb' }], key: 'id', name: 'name' };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { list, key, name } = form.getFieldsValue();
    const rs = TransformUtil.select.transformSelect(toJSON(list), key, name);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'list  (参数1)', type: 'codeEditorCard', name: 'list' },
        { label: 'key   (参数2)', type: 'input', name: 'key' },
        { label: 'name  (参数3)', type: 'input', name: 'name' },
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
