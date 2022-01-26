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
import { deleteCatalog, getCatalogs } from '@/services/simple-abp/articles/catalog-service';
import simpleAbp from '@/utils/simple-abp';

import EditCatalogForm from './components/EditCatalogForm';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [editId, handleEditId] = useState<string>('');
  const [editModalTitle, handleEditModalTitle] = useState<string>('');
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('SimpleAbpArticles');
  const g = simpleAbpUtils.auth.isGranted;

  const handleEditCatalog = async (row: Articles.Article) => {
    handleEditModalTitle(l('Edit'));
    handleEditId(row.id);
    handleEditModalVisible(true);
  };

  const handleCreateCatalog = () => {
    handleEditModalTitle(l('NewCatalog'));
    handleEditId('');
    handleEditModalVisible(true);
  };

  const handleDelete = async (row: Articles.Catalog) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('DetetCatalog', row.title),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await deleteCatalog(row.id);
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

  const actionDom = (row: Articles.Catalog) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'Edit'} onClick={async () => await handleEditCatalog(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<Articles.Catalog>[] = [
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
      title: l('Description'),
      dataIndex: 'description',
      search: false,
      width: 160,
    },
    {
      title: l('CreationTime'),
      dataIndex: 'creationTime',
      search: false,
      width: 160,
    },
  ];

  return (
    <PageContainer>
      <ProTable<Articles.Catalog>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            pageIndex: params.current,
            pageSize: params.pageSize,
            ...params,
          };
          const result = await getCatalogs(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreateCatalog}>
            <PlusOutlined /> {l('NewCatalog')}
          </Button>,
        ]}
      />
      <EditCatalogForm
        params={{
          id: editId,
          title: editModalTitle,
          isModalVisible: editModalVisible,
          onCancel: () => {
            handleEditModalVisible(false);
          },
          onSubmit: () => {
            handleEditModalVisible(false);
            actionRef.current?.reload();
          },
        }}
        simpleAbpUtils={simpleAbpUtils}
      />
    </PageContainer>
  );
};

export default TableList;
