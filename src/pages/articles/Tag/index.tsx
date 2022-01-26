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
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from '@/services/simple-abp/articles/tag-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [editModel, handleEditModel] = useState<Articles.Tag>();
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

  const handleEditTag = async (row: Articles.Tag) => {
    handleEditModalTitle(l('Edit'));
    handleEditModel(row);
    handleEditModalVisible(true);
  };

  const handleCreateTag = () => {
    handleEditModalTitle(l('NewTag'));
    handleEditModel(undefined);
    handleEditModalVisible(true);
  };

  const handleSubmit = async (values: Articles.Tag) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      editModel?.id ? await updateTag(values.id, values) : await createTag(values);
      message.success(l('SavedSuccessfully'));
      actionRef.current?.reload();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handleDelete = async (row: Articles.Tag) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('DetetCatalog', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await deleteTag(row.id);
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

  const actionDom = (row: Articles.Tag) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item key={row.id + 'EditUser'} onClick={() => handleEditTag(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.id + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
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

      <ModalForm<Articles.Tag>
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
        <ProFormText name="id" hidden />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
