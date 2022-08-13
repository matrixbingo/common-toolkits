
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { isString } from 'lodash';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { arr: [{id: 'a1', name: 'n1'}, {id: 'a2', name: 'n2'}, {id: 'a3', name: {bb: 122} }], path: 'id', values: ['a2', 'a3'] };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onValidate = (annotations) => {
    // window.console.log('annotations ---------------->', annotations);
  }

  const onClick = () => {
    const { arr, path, values } = form.getFieldsValue();
    const rs = ArrayUtil.filterItemListByPaths(toJSON(arr), path, toJSON(values));
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
          { label: 'arr    (参数1)', type: 'codeEditorCard', name: 'arr', componentProps: { onValidate } },
          { label: 'path   (参数2)', type: 'input', name: 'path' },
          { label: 'values (参数3)', type: 'codeEditorCard', name: 'values' },
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
