import React, { useEffect, useState } from 'react';
import { message, Divider, Form, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { AntdThemeSettingsDto } from '@/services/antd-theme/dtos/AntdThemeSettingsDto';
import antdThemeSettingsService from '@/services/antd-theme/antd-theme-settings-service';

export type AntdThemeSettingsProps = {
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const COLOR_LIST = [
  {
    color: '#1890ff',
  },
  {
    color: '#F5222D',
  },
  {
    color: '#FA541C',
  },
  {
    color: '#FAAD14',
  },
  {
    color: '#13C2C2',
  },
  {
    color: '#52C41A',
  },
  {
    color: '#2F54EB',
  },
  {
    color: '#722ED1',
  },
];

var firstData: any = null;

const AntdThemeSettings: React.FC<AntdThemeSettingsProps> = (props) => {
  const l = props.simpleAbpUtils.localization.getResource('SimpleAbpAntdTheme');
  const [form] = Form.useForm();
  const [themeModel, setThemeModel] = useState<any>();
  const [colorList, setColorList] = useState<{ color: string }[]>(COLOR_LIST);
  useEffect(() => {
    const fetchData = async () => {
      if (firstData != null) {
        firstData = null;
        return;
      }
      const hide = message.loading(l('LoadingWithThreeDot'), 0);
      const result = await antdThemeSettingsService.get();
      firstData = result;
      setThemeModel(result);
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
          {colorList.map((c) => {
            return (
              <Tag
                style={{ cursor: 'pointer' }}
                key={c.color}
                color={c.color}
                icon={themeModel?.themeColor?.color === c.color ? <CheckOutlined /> : ''}
                onClick={() => {
                  themeModel.themeColor.color = c.color;
                  form.setFieldsValue(themeModel);
                  setColorList([...colorList]);
                }}
              >
                {'#'}
              </Tag>
            );
          })}
          <ProFormText name={['themeColor', 'color']} />
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
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['navigationMode', 'fixedHeader']}
            label={l('FixedHeader')}
          />
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['navigationMode', 'fixedSidebar']}
            label={l('FixedSidebar')}
          />
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['navigationMode', 'splitMenus']}
            label={l('SplitMenus')}
          />
        </ProForm.Group>
        <Divider style={{ margin: '10px 0' }} />
        <ProForm.Group title={l('RegionalSettings')}>
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['regionalSettings', 'header']}
            label={l('Header')}
          />
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['regionalSettings', 'footer']}
            label={l('Footer')}
          />
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['regionalSettings', 'menu']}
            label={l('Menu')}
          />
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['regionalSettings', 'menuHeader']}
            label={l('MenuHeader')}
          />
        </ProForm.Group>
        <Divider style={{ margin: '10px 0' }} />
        <ProForm.Group title={l('OtherSettings')}>
          <ProFormSwitch
            fieldProps={{ size: 'small' }}
            name={['otherSettings', 'weakMode']}
            label={l('WeakMode')}
          />
        </ProForm.Group>
      </ProForm>
    </ProCard>
  );
};

export default AntdThemeSettings;
