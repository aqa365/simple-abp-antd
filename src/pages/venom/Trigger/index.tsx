import React, { useState, useRef, useEffect } from 'react';
import { Form, message, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect, ProFormDigit, ProFormSwitch } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import simpleAbp from '@/utils/simple-abp';

import { TriggerConfigDto } from '@/services/venom/dtos/Trigger/TriggerConfigDto';
import triggerService from '@/services/venom/trigger-service';
import appConfigService from '@/services/venom/application-configuration-service';

const keys = appConfigService.getKeys();

const TableList: React.FC = () => {
  const [form] = Form.useForm();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  useEffect(() => {
    const setData = () => {
      const rcsConfig = triggerService.get();
      form.setFieldsValue(rcsConfig);
    };
    setData();
  }, [triggerService]);

  const handleSubmit = async (values: TriggerConfigDto) => {
    console.log(values);
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    triggerService.update(values);
    hide();
  };

  return (
    <PageContainer>
      <ProCard style={{ maxWidth: '600px' }}>
        <ProForm<TriggerConfigDto>
          layout={'horizontal'}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
          labelWrap
          submitter={{
            searchConfig: {
              submitText: l('Save'),
              resetText: l('Cancel'),
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <ProFormSwitch name="active" label="Active" />
          <ProFormSelect
            options={keys}
            width="sm"
            name="bindKey"
            label={l('BindKey')}
            showSearch
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('BindKey')),
              },
            ]}
          />
          <ProFormDigit label="Pause" name="pause" min={1} max={1000} />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default TableList;
