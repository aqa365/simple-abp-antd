import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Switch, Form, Modal, message, TreeSelect } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import {
  PlusOutlined,
  SettingOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import simpleAbp from '@/utils/simple-abp';

import { ConfigDto } from '@/services/venom/dtos/ConfigDto';
import appConfigService from '@/services/venom/application-configuration-service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [model, setModel] = useState<ConfigDto>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [configList, setConfigList] = useState<ConfigDto[]>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  useEffect(() => {
    const setData = () => {
      var configs = appConfigService.getConfigList();
      setConfigList(configs);

      if (modalVisible) {
        form.setFieldsValue(model);
      }
    };
    setData();
  }, [modalVisible]);

  const handleEdit = async (row: ConfigDto) => {
    setModalTitle(l('Edit'));
    setModel(row);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setModalTitle(l('New'));
    setModel(undefined);
    setModalVisible(true);
  };

  const handleSubmit = async (values: ConfigDto) => {
    console.log(values);
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    if (model) {
      const oldConfig = appConfigService.getConfig(values.name);
      if (oldConfig) {
        oldConfig.threadSleep = values.threadSleep;
        appConfigService.updateConfig(oldConfig);
      }
    } else {
      appConfigService.createConfig(values);
    }
    actionRef.current?.reload();
    hide();
  };

  const handleDelete = async (row: ConfigDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        const config = appConfigService.getConfig(row.name);
        if (config?.active) {
          message.warning('current config is used !');
          hide();
          return;
        }
        appConfigService.deleteConfig(row.name);
        actionRef.current?.reload();
        message.success(l('SuccessfullyDeleted'));
        hide();
      },
    });
  };

  const actionDom = (row: ConfigDto) => {
    return (
      <Menu key={row.name + 'menu'}>
        <Menu.Item key={row.name + 'Edit'} onClick={() => handleEdit(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.name + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<ConfigDto>[] = [
    {
      title: l('Actions'),
      search: false,
      dataIndex: '',
      width: 160,
      render: (text, record, _, action) => [
        <Dropdown overlay={actionDom(record)} trigger={['click']} key={record.name + 'Dropdown'}>
          <Button type="primary">
            <SettingOutlined />
            {l('Actions')}
            <DownOutlined />
          </Button>
        </Dropdown>,
      ],
    },
    {
      title: l('Name'),
      dataIndex: 'name',
      width: 160,
      search: false,
    },
    {
      title: l('ThreadSleep'),
      dataIndex: 'threadSleep',
      width: 160,
      search: false,
    },
    {
      title: l('Active'),
      dataIndex: 'active',
      width: 160,
      search: false,
      render: (text, row, index) => {
        return (
          <Switch
            size="small"
            checked={row.active}
            onChange={(checked) => {
              if (checked) {
                appConfigService.enableConfig(row.name, checked);
                actionRef.current?.reload();
              }
            }}
          />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<ConfigDto>
        actionRef={actionRef}
        rowKey={(d) => d.name}
        request={async (params, sort, filter) => {
          const configs = appConfigService.getConfigList();
          return {
            data: configs,
            total: configs.length,
            success: true,
          };
        }}
        search={false}
        columns={columns}
        options={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreate}>
            <PlusOutlined /> {l('NewConfig')}
          </Button>,
        ]}
      />
      <ModalForm<ConfigDto>
        title={modalTitle}
        form={form}
        modalProps={{ centered: true }}
        visible={modalVisible}
        width="400px"
        submitter={{
          searchConfig: {
            submitText: l('Save'),
            resetText: l('Cancel'),
          },
        }}
        onVisibleChange={(visible) => {
          if (visible) {
            form.resetFields();
            return;
          }
          setModalVisible(false);
        }}
        onFinish={async (values) => {
          await handleSubmit(values);
          setModalVisible(false);
        }}
      >
        <ProFormText
          name="name"
          disabled={model ? true : false}
          label={l('Name')}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Name')),
              whitespace: true,
            },
          ]}
        />
        <ProFormDigit
          name="threadSleep"
          label={l('ThreadSleep')}
          min={1}
          max={5000}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('ThreadSleep')),
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
