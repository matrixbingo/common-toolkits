
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import { useResetState } from 'common-toolkits-hooks';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { arr: [1,2,3,4, { bb: 11 }, "aa"], item: "aa"};

const options = [{label:'json', value:'json'}, {label:'javascript', value:'javascript'}];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<'javascript'| 'json'>('json');

  const onClick = () => {
    const { arr, item } = form.getFieldsValue();
    const customizer =  mode === 'javascript' ? toFn(item) : item;
    const rs = ArrayUtil.remove(toJSON(arr), customizer);
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
        { label: 'list        (参数1)', type: 'codeEditorCard', name: 'arr' },
        { label: 'customizer  (参数2)', type: 'codeEditorCard', name: 'item', componentProps: { selectProps: { options, onChange: seTMod } }},
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
