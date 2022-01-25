import React, { useState, useRef } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { getArticles } from '@/services/simple-abp/articles/article-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [editId, handleEditId] = useState<string>('');
  const [editModalTitle, handleEditModalTitle] = useState<string>('');
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = simpleAbpUtils.auth.isGranted;

  const handleEditArticle = async (row: Articles.Article) => {
    handleEditModalTitle(l('Edit'));
    handleEditId(row.id);
    handleEditModalVisible(true);
  };

  const handleCreateArticle = () => {
    handleEditModalTitle(l('NewArticle'));
    handleEditId('');
    handleEditModalVisible(true);
  };

  const actionDom = (row: Articles.Article) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'EditUser'} onClick={async () => await handleEditArticle(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'}>{l('Delete')}</Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<Articles.Article>[] = [
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
    },
    {
      title: l('Catalog'),
      dataIndex: 'catalogTitle',
      width: 160,
      render: (text, row, index) => {
        return row.catalog?.title;
      },
    },
    {
      title: l('Tag'),
      dataIndex: 'tag',
      width: 160,
      search: {
        transform: (value: any) => ({
          tagName: value,
        }),
      },
    },
    {
      title: l('IsTop'),
      dataIndex: 'isTop',
      width: 160,
    },
    {
      title: l('IsRefinement'),
      dataIndex: 'isRefinement',
      width: 160,
    },
    {
      title: l('State'),
      dataIndex: 'state',
      width: 160,
    },
  ];

  return (
    <PageContainer>
      <ProTable<Articles.Article>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            pageIndex: params.current,
            pageSize: params.pageSize,
            ...params,
          };
          const result = await getArticles(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreateArticle}>
            <PlusOutlined /> {l('NewArticle')}
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
