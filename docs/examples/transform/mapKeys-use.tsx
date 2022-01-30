
import React, { useState } from 'react';
import { TransformUtil, useResetState } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { target: [{ a: 1, b: 2 },{ a: 11, b: 22 }], customizer: {a: 'a1', b: 'b1'}};

const options = [{label:'json', value:'json'}, {label:'javascript', value:'javascript'}];

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();
  const [mode, seTMod, resetMod] = useResetState<'javascript'| 'json'>('json');

  const onClick = () => {
    const { target, customizer } = form.getFieldsValue();
    const item =  mode === 'javascript' ? toFn(customizer) : toJSON(customizer);
    const rs = TransformUtil.mapKeys(toJSON(target), item);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
    resetMod();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'target      (参数1)', type: 'codeEditorCard', name: 'target' },
        { label: 'customizer  (参数2)', type: 'codeEditorCard', name: 'customizer', componentProps: { selectProps: { options, onChange: seTMod } }},
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
