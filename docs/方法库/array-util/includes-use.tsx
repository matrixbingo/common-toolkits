
import React, { useState } from 'react';
import { ArrayUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { isString } from 'lodash';
import { compile, toFn, toJSON } from '../base/util';

const initialValues = { arr: [{ a : 1, b: 2 }, { a : 11, b: 22 }, { a : 22, b: 33 }], fun: (item) => item.a > 2 };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { arr, fun } = form.getFieldsValue();
    const rs = ArrayUtil.includes(toJSON(arr), toFn(fun));
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
        { label: 'item (参数2)', type: 'codeEditorCard', name: 'fun', componentProps: { mode: 'javascript' } },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary', onClick } },
            { type: 'button', componentProps: { children: '重置', onClick: reset } },
          ],
        },
      ]}
    </YForm>
    <div>结果:{String(result)}</div>
  </CollapsibleCard>)
};

export default Demo;
