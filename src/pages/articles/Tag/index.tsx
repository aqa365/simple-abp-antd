import React, { useState, useRef } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { getTags } from '@/services/simple-abp/articles/tag-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [editId, handleEditId] = useState<string>('');
  const [editModalTitle, handleEditModalTitle] = useState<string>('');
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = simpleAbpUtils.auth.isGranted;

  const handleEditTag = async (row: Articles.Article) => {
    handleEditModalTitle(l('Edit'));
    handleEditId(row.id);
    handleEditModalVisible(true);
  };

  const handleCreateTag = () => {
    handleEditModalTitle(l('NewTag'));
    handleEditId('');
    handleEditModalVisible(true);
  };

  const actionDom = (row: Articles.Tag) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'EditUser'} onClick={async () => await handleEditTag(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'}>{l('Delete')}</Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<Articles.Tag>[] = [
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
      title: l('CreationTime'),
      dataIndex: 'creationTime',
      search: false,
      width: 160,
    },
  ];

  return (
    <PageContainer>
      <ProTable<Articles.Tag>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            pageIndex: params.current,
            pageSize: params.pageSize,
            ...params,
          };
          const result = await getTags(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreateTag}>
            <PlusOutlined /> {l('NewTag')}
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
