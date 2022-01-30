
import React, { useState } from 'react';
import { TransformUtil, useResetState } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toFn, toJSON } from '../base/util';
import { useMount } from 'ahooks';

const initialValues = { target: [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}], path: ['id', 'name']};

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { target, path } = form.getFieldsValue();
    const rs = TransformUtil.toArrByPaths(toJSON(target), toJSON(path));
    setResult(rs);
  }

  const reset = () => {
    form.resetFields();
    onClick();
  }

  return (<CollapsibleCard title="示例" defaultCollapsed={true}>
    <YForm form={form} initialValues={initialValues}>
      {[
        { label: 'arr   (参数1)', type: 'codeEditorCard', name: 'target' },
        { label: 'path  (参数2)', type: 'codeEditorCard', name: 'path' },
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
