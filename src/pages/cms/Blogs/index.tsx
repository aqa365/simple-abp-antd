import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Form, Modal, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  PlusOutlined,
  SettingOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { BlogDto } from '@/services/cms-kit-admin/dtos/BlogDto';
import blogAdminService from '@/services/cms-kit-admin/blog-admin-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [editModel, handleEditModel] = useState<BlogDto>();
  const [editModalTitle, handleEditModalTitle] = useState<string>('');
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  useEffect(() => {
    const setData = () => {
      if (editModalVisible) {
        form.setFieldsValue(editModel);
      }
    };
    setData();
  }, [editModalVisible]);

  const handleEdit = async (row: any) => {
    handleEditModalTitle(l('Edit'));
    handleEditModel(row);
    handleEditModalVisible(true);
  };

  const handleCreate = () => {
    handleEditModalTitle(l('NewBlog'));
    handleEditModel(undefined);
    handleEditModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      editModel?.id
        ? await blogAdminService.update(values.id, values)
        : await blogAdminService.create(values);
      message.success(l('SuccessfullySaved'));
      actionRef.current?.reload();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handleDelete = async (row: BlogDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await blogAdminService.delete(row.id);
          message.success(l('SuccessfullyDeleted'));
          actionRef.current?.reload();
        } catch (error) {
          console.error(error);
        } finally {
          hide();
        }
      },
    });
  };

  const actionDom = (row: BlogDto) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'Features'}>{l('Features')}</Menu.Item>
        <Menu.Item key={row.id + 'Edit'} onClick={() => handleEdit(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<BlogDto>[] = [
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
      search: {
        transform: (value: any) => ({
          filter: value,
        }),
      },
    },
    {
      title: l('Slug'),
      dataIndex: 'slug',
      width: 160,
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<BlogDto>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            maxResultCount: params.pageSize,
            skipCount: ((params.current || 1) - 1) * (params.pageSize || 10),
            ...params,
          };
          const result = await blogAdminService.getList(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreate}>
            <PlusOutlined /> {l('NewBlog')}
          </Button>,
        ]}
      />

      <ModalForm<BlogDto>
        title={editModalTitle}
        form={form}
        modalProps={{ centered: true }}
        visible={editModalVisible}
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
          handleEditModalVisible(false);
        }}
        onFinish={async (values) => {
          await handleSubmit(values);
          handleEditModalVisible(false);
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
        <ProFormText
          name="slug"
          label={l('Slug')}
          placeholder={l('EnterYourFiled', l('Slug').toLowerCase())}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Slug')),
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
