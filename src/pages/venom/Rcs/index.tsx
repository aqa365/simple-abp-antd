import React, { useState, useRef, useEffect } from 'react';
import { Form, message, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect, ProFormSlider, ProFormSwitch } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import simpleAbp from '@/utils/simple-abp';

import { RcsConfigDto } from '@/services/venom/dtos/Rcs/RcsConfigDto';
import rcsService from '@/services/venom/rsc-service';
import appConfigService from '@/services/venom/application-configuration-service';

const keys = appConfigService.getKeys();

const TableList: React.FC = () => {
  const [form] = Form.useForm();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  useEffect(() => {
    const setData = () => {
      const rcsConfig = rcsService.get();
      form.setFieldsValue(rcsConfig);
    };
    setData();
  }, [rcsService]);

  const handleSubmit = async (values: RcsConfigDto) => {
    console.log(values);
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    rcsService.update(values);
    hide();
  };

  return (
    <PageContainer>
      <ProCard style={{ maxWidth: '600px' }}>
        <ProForm<RcsConfigDto>
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
          <ProFormSlider min={0} max={2} name="scope" label={l('Scope')} width="sm" step={0.1} />

          <Divider />
          <ProFormSwitch name="aimActive" label="AimActive" />

          <ProFormSelect
            fieldProps={{
              mode: 'multiple',
            }}
            options={[
              {
                value: 8,
                label: 'Head',
              },
              {
                value: 7,
                label: 'Neck',
              },
              {
                value: 6,
                label: 'Chest',
              },
            ]}
            width="sm"
            name="position"
            label={l('Position')}
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('Position')),
              },
            ]}
          />
          <ProFormSlider min={0} name="distance" label={l('Distance')} width="sm" />

          <ProFormSlider min={0} name="speed" label={l('Speed')} width="sm" />
          <ProFormSlider
            range
            min={0}
            name="shootsFiredScope"
            label={l('ShootsFiredScope')}
            width="sm"
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default TableList;
