
import React, { useState } from 'react';
import { UrlUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { param: {id: 'a1', name: 'n1'}, url: 'http://localhost:8000/index?asas=212&wqwd=54545' };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { param, url } = form.getFieldsValue();
    const rs = UrlUtil.extendParam(toJSON(param), url);
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
          { label: 'param   (参数1)', type: 'codeEditorCard', name: 'param'},
          { label: 'url  (参数2)', type: 'input', name: 'url', rules:[{ required: false} ] },
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
    </CollapsibleCard>
  </>)
};

export default Demo;
