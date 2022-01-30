
import React, { useState } from 'react';
import { UrlUtil } from 'common-toolkits';
import ReactJson from 'react-json-view'
import { YForm } from 'aem-ui-forms';
import { CollapsibleCard } from 'aem-ui';
import { toJSON } from '../base/util';

const initialValues = { url: 'http://localhost:8000/index?asas=212&wqwd=54545' };

const Demo = () => {
  const [form] = YForm.useForm();
  const [ result, setResult ] = useState<any>();

  const onClick = () => {
    const { url } = form.getFieldsValue();
    const rs = UrlUtil.urlParams(url);
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
      <ReactJson theme="monokai" src={result} />
    </CollapsibleCard>
  </>)
};

export default Demo;
