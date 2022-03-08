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
import { PageDto } from '@/services/cms-kit-admin/dtos/PageDto';
import pageAdminService from '@/services/cms-kit-admin/page-admin-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [editModel, handleEditModel] = useState<PageDto>();
  const [editModalTitle, handleEditModalTitle] = useState<string>('');
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('SimpleAbpArticles');
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
    handleEditModalTitle(l('New Page'));
    handleEditModel(undefined);
    handleEditModalVisible(true);
  };

  const handleDelete = async (row: PageDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('DetetCatalog', row.title),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await pageAdminService.delete(row.id);
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

  const actionDom = (row: PageDto) => {
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

  const columns: ProColumns<PageDto>[] = [
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
      title: l('Title'),
      dataIndex: 'title',
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
    {
      title: l('CreationTime'),
      dataIndex: 'creationTime',
      width: 160,
      search: false,
    },
    {
      title: l('LastModificationTime'),
      dataIndex: 'lastModificationTime',
      width: 160,
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<PageDto>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            maxResultCount: params.pageSize,
            skipCount: ((params.current || 1) - 1) * (params.pageSize || 10),
            ...params,
          };
          const result = await pageAdminService.getList(requestData);
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
            <PlusOutlined /> {l('New Page')}
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
