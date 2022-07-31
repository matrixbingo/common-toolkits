
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import { useResetState } from '@common-toolkits/hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';

const initialValues = { arr: [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}, {id: 'a1', name: {bb: 122} }], path: 'id', customizer: 'a1' };
const options = [{label:'json', value:'json'}, {label:'javascript', value:'javascript'}];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<'javascript'| 'json'>('json');

  const onClick = () => {
    const { arr, path, customizer } = form.getFieldsValue();
    const item =  mode === 'javascript' ? toFn(customizer) : customizer;
    const rs = ArrayUtil.filterItemByPath(toJSON(arr), path, item);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<>
    <CollapsibleCard title="示例" defaultCollapsed={true}>
      <YForm form={form} initialValues={initialValues}>
        {[
          { label: 'arr   (参数1)', type: 'codeEditorCard', name: 'arr'},
          { label: 'path  (参数2)', type: 'input', name: 'path' },
          { label: 'customizer (参数3)', type: 'codeEditorCard', name: 'customizer', componentProps: { selectProps: { options, onChange: seTMod } }},
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
