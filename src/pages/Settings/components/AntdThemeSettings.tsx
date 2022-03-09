import React, { useEffect, useState } from 'react';
import { message, Divider, Form } from 'antd';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormSelect, ProFormCheckbox } from '@ant-design/pro-form';
import { AntdThemeSettingsDto } from '@/services/antd-theme/dtos/AntdThemeSettingsDto';
import antdThemeSettingsService from '@/services/antd-theme/antd-theme-settings-service';

export type AntdThemeSettingsProps = {
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const AntdThemeSettings: React.FC<AntdThemeSettingsProps> = (props) => {
  const l = props.simpleAbpUtils.localization.getResource('SimpleAbpAntdTheme');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const hide = message.loading(l('LoadingWithThreeDot'), 0);
      const result = await antdThemeSettingsService.get();
      form.setFieldsValue(result);
      hide();
    };

    fetchData();
  }, [props]);

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      await antdThemeSettingsService.update(values);
      message.success(l('SuccessfullySaved'));
      window.location.reload();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  return (
    <ProCard title={l('AntdTheme')} headerBordered>
      <ProForm<AntdThemeSettingsDto>
        form={form}
        submitter={{
          searchConfig: {
            submitText: l('Save'),
            resetText: l('Reset'),
          },
        }}
        onFinish={handleSubmit}
      >
        <ProForm.Group title={l('PageStyleSetting')}>
          <ProFormSelect
            name={['pageStyleSetting', 'pageStyle']}
            label={l('PageStyle')}
            options={[
              { value: 1, label: 'Bright' },
              { value: 2, label: 'DarkMenu' },
              { value: 3, label: 'Dark' },
            ]}
          />
        </ProForm.Group>
        <Divider style={{ margin: '10px 0' }} />
        <ProForm.Group title={l('ThemeColor')}>
          <ProFormSelect
            name={['themeColor', 'color']}
            label={l('Color')}
            options={[
              { value: 1, label: 'Lightblue' },
              { value: 2, label: 'Dusk' },
              { value: 3, label: 'Volcano' },
              { value: 4, label: 'Nightfall' },
              { value: 5, label: 'Cyan' },
              { value: 6, label: 'Auroragreen' },
              { value: 7, label: 'Geekblue' },
              { value: 8, label: 'Purple' },
            ]}
          />
        </ProForm.Group>
        <Divider style={{ margin: '10px 0' }} />
        <ProForm.Group title={l('NavigationMode')}>
          <ProFormSelect
            name={['navigationMode', 'slidMenuLayout']}
            label={l('SlidMenuLayout')}
            options={[
              { value: 1, label: 'Left' },
              { value: 2, label: 'Top' },
              { value: 3, label: 'LeftAndTop' },
            ]}
          />
          <ProFormSelect
            name={['navigationMode', 'contentWidth']}
            label={l('ContentWidth')}
            options={[
              { value: 1, label: 'Default' },
              { value: 2, label: 'Flow' },
            ]}
          />
          <ProFormCheckbox name={['navigationMode', 'fixedHeader']} label={l('FixedHeader')} />
          <ProFormCheckbox name={['navigationMode', 'fixedSidebar']} label={l('FixedSidebar')} />
          <ProFormCheckbox name={['navigationMode', 'splitMenus']} label={l('SplitMenus')} />
        </ProForm.Group>
        <Divider style={{ margin: '10px 0' }} />
        <ProForm.Group title={l('RegionalSettings')}>
          <ProFormCheckbox name={['regionalSettings', 'header']} label={l('Header')} />
          <ProFormCheckbox name={['regionalSettings', 'footer']} label={l('Footer')} />
          <ProFormCheckbox name={['regionalSettings', 'menu']} label={l('Menu')} />
          <ProFormCheckbox name={['regionalSettings', 'menuHeader']} label={l('MenuHeader')} />
        </ProForm.Group>
        <Divider style={{ margin: '10px 0' }} />
        <ProForm.Group title={l('OtherSettings')}>
          <ProFormCheckbox name={['otherSettings', 'weakMode']} label={l('WeakMode')} />
        </ProForm.Group>
      </ProForm>
    </ProCard>
  );
};

export default AntdThemeSettings;
