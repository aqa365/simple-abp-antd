import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import simpleAbp from '@/utils/simple-abp';

import { RadarConfigDto } from '@/services/venom/dtos/Radar/RadarConfigDto';
import radarService from '@/services/venom/radar-service';
import appConfigService from '@/services/venom/application-configuration-service';

const keys = appConfigService.getKeys();

const TableList: React.FC = () => {
  const [form] = Form.useForm();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  useEffect(() => {
    const setData = () => {
      const rcsConfig = radarService.get();
      form.setFieldsValue(rcsConfig);
    };
    setData();
  }, [radarService]);

  const handleSubmit = async (values: RadarConfigDto) => {
    console.log(values);
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    radarService.update(values);
    hide();
  };

  return (
    <PageContainer>
      <ProCard style={{ maxWidth: '600px' }}>
        <ProForm<RadarConfigDto>
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
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default TableList;
