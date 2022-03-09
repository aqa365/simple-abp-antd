import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Modal, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SettingOutlined, DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { CommentWithAuthorDto } from '@/services/cms-kit-admin/dtos/CommentWithAuthorDto';
import commentAdminService from '@/services/cms-kit-admin/comment-admin-service';
import CommentDetail from './CommentDetail';

export type CommentTableListProps = {
  id?: string;
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const CommentTableList: React.FC<CommentTableListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const l = props.simpleAbpUtils.localization.getResource('CmsKit');
  const g = props.simpleAbpUtils.auth.isGranted;

  const [modelId, setModelId] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (props.id) {
        actionRef.current?.reload();
      }
    };

    fetchData();
  }, [props.id]);

  const handleDetail = async (row: any) => {
    setModelId(row.id);
    setModalVisible(true);
  };

  const handleDelete = async (row: CommentWithAuthorDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.text),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await commentAdminService.delete(row.id);
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

  const actionDom = (row: CommentWithAuthorDto) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'Detail'} onClick={() => handleDetail(row)}>
          {l('Detail')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<CommentWithAuthorDto>[] = [
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
      title: l('Username'),
      dataIndex: 'userName',
      width: 160,
      search: {
        transform: (value: any) => ({
          author: value,
        }),
      },
      render: (text, row, index) => {
        return row.author?.userName;
      },
    },
    {
      title: l('EntityType'),
      dataIndex: 'entityType',
      order: 98,
      width: 160,
    },
    {
      title: l('Text'),
      dataIndex: 'text',
      // width: 500,
      search: false,
    },
    {
      title: l('CreationTime'),
      dataIndex: 'creationTime',
      width: 160,
      search: false,
    },
    {
      order: 99,
      title: l('CreationTime'),
      valueType: 'dateRange',
      dataIndex: 'creationTime',
      hideInTable: true,
      search: {
        transform: (value: any) => ({
          CreationStartDate: value[0] + ' 00:00:00',
          CreationEndDate: value[1] + ' 23:59:59',
        }),
      },
    },
  ];

  return (
    <>
      <ProTable<CommentWithAuthorDto>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            repliedCommentId: props.id,
            maxResultCount: params.pageSize,
            skipCount: ((params.current || 1) - 1) * (params.pageSize || 10),
            ...params,
          };
          const result = await commentAdminService.getList(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        options={false}
      />
      <CommentDetail
        params={{
          id: modelId,
          isModalVisible: modalVisible,
          onCancel: () => {
            setModalVisible(false);
            actionRef.current?.reload();
          },
        }}
        simpleAbpUtils={props.simpleAbpUtils}
      />
    </>
  );
};
export default CommentTableList;
