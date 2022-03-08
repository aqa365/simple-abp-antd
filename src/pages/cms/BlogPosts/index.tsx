import React, { useState, useRef } from 'react';
import { Menu, Dropdown, Button, Modal, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  PlusOutlined,
  SettingOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { BlogPostListDto } from '@/services/cms-kit-admin/dtos/BlogPostListDto';
import blogPostAdminService from '@/services/cms-kit-admin/blog-post-admin-service';
import simpleAbp from '@/utils/simple-abp';

import EditBlogPostForm from './components/EditBlogPostForm';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [modalVisible, setmModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  const handleEdit = async (row: any) => {
    setModalTitle(l('Edit'));
    setId(row.id);
    setmModalVisible(true);
  };

  const handleCreate = () => {
    setModalTitle(l('NewBlogPost'));
    setId('');
    setmModalVisible(true);
  };

  const handleDelete = async (row: BlogPostListDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.title),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await blogPostAdminService.delete(row.id);
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

  const actionDom = (row: BlogPostListDto) => {
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

  const columns: ProColumns<BlogPostListDto>[] = [
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
      title: l('BlogName'),
      dataIndex: 'blogName',
      width: 160,
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
      <ProTable<BlogPostListDto>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            maxResultCount: params.pageSize,
            skipCount: ((params.current || 1) - 1) * (params.pageSize || 10),
            ...params,
          };
          const result = await blogPostAdminService.getList(requestData);
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
            <PlusOutlined /> {l('NewBlogPost')}
          </Button>,
        ]}
      />
      <EditBlogPostForm
        params={{
          id: id,
          title: modalTitle,
          visible: modalVisible,
          onCancel: () => {
            setmModalVisible(false);
          },
          onSubmit: () => {
            setmModalVisible(false);
          },
        }}
        simpleAbpUtils={simpleAbpUtils}
      />
    </PageContainer>
  );
};

export default TableList;
