import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Form, Modal, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import {
  PlusOutlined,
  SettingOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [tagModel, setTagModel] = useState<any>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  const handleEdit = async (row: any) => {
    setModalTitle(l('Edit'));
    setTagModel(row);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setModalTitle(l('NewTag'));
    setTagModel(undefined);
    setModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    hide();
  };

  const handleDelete = async (row: any) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        message.success(l('SuccessfullyDeleted'));
        hide();
      },
    });
  };

  const actionDom = (row: any) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'Edit'} onClick={() => handleEdit(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<any>[] = [
    {
      title: l('Actions'),
      search: false,
      dataIndex: '',
      width: 160,
      render: (text, record, _, action) => [
        <Dropdown overlay={actionDom(record)} trigger={['click']} key={record.id + 'Dropdown'}>
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
      title: l('WeaponType'),
      dataIndex: 'weaponType',
      width: 160,
      search: false,
    },
    {
      title: l('BindKeys'),
      dataIndex: 'weaponType',
      width: 160,
      search: false,
    },
    {
      title: l('Position'),
      dataIndex: 'weaponType',
      width: 160,
      search: false,
    },
    {
      title: l('Distance'),
      dataIndex: 'distance',
      width: 160,
      search: false,
    },
    {
      title: l('Speed'),
      dataIndex: 'speed',
      width: 160,
      search: false,
    },
    {
      title: l('ShootsFiredScope'),
      dataIndex: 'shootsFired',
      width: 160,
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          return {
            data: [],
            total: 0,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreate}>
            <PlusOutlined /> {l('NewConfig')}
          </Button>,
        ]}
      />

      <ModalForm<any>
        title={modalTitle}
        form={form}
        modalProps={{ centered: true }}
        visible={modalVisible}
        width={640}
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
          label={l('Name')}
          placeholder={l('EnterYourFiled', l('Name').toLowerCase())}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Name')),
              whitespace: true,
            },
          ]}
        />
        <ProFormText name="id" hidden />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
