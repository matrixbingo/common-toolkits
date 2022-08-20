
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';

const initialValues = { arr: [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}], list: [{id: 'a1', name: {bb: 122} }], customizer: item => item.id === 'a1'  };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<'javascript'| 'json'>('json');

  const onClick = () => {
    const { arr, list, customizer } = form.getFieldsValue();
    const rs = ArrayUtil.pushArray(toJSON(arr), toJSON(list),  toFn(customizer));
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
          { label: 'list  (参数2)', type: 'codeEditorCard', name: 'list' },
          { label: 'customizer (参数3)', type: 'codeEditorCard', name: 'customizer', componentProps: { mode: 'javascript' } },
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
