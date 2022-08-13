
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { arr: [{a:['a'], n:['n']}, {b:['b']}, ["v", "k"]], index: 1, item: 'c'};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { arr, index, item} = form.getFieldsValue();
    const rs = ArrayUtil.pushByIndex(toJSON(arr), index, item);
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'arr  (参数1)', type: 'codeEditorCard', name: 'arr' },
        { label: 'index  (参数2)', type: 'inputStringNumber', name: 'index' },
        { label: 'item  (参数2)', type: 'input', name: 'item' },
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
