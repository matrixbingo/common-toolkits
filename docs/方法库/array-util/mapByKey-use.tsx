
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { arr: [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}, {id: 'a1', name: {bb: 122} }], path: 'id', value: 'id' };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { arr, value } = form.getFieldsValue();
    const rs = ArrayUtil.mapByKey(toJSON(arr), value);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<>
    <CollapsibleCard title="示例" defaultCollapsed={false}>
      <YForm form={form} initialValues={initialValues}>
        {[
          { label: 'arr   (参数1)', type: 'codeEditorCard', name: 'arr'},
          { label: 'value (参数2)', type: 'input', name: 'value' },
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
    </CollapsibleCard>
  </>)
};

export default Demo;
