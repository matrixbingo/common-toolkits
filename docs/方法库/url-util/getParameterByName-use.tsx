
import React, { useState } from 'react';
import { UrlUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { name: 'id', url: 'http://localhost:8000/index?id=a1&name=n1' };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { name, url } = form.getFieldsValue();
    const rs = UrlUtil.getParameterByName(name, url);
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
          { label: 'name (参数1)', type: 'input', name: 'name'},
          { label: 'url  (参数2)', type: 'input', name: 'url', rules:[{ required: false} ]},
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
