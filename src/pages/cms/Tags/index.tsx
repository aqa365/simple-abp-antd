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
import { TagDto } from '@/services/cms-kit/dtos/TagDto';
import tagAdminService from '@/services/cms-kit-admin/tag-admin-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [tagModel, setTagModel] = useState<TagDto>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  useEffect(() => {
    const setData = () => {
      if (modalVisible) {
        form.setFieldsValue(tagModel);
      }
    };
    setData();
  }, [modalVisible]);

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
    try {
      tagModel?.id
        ? await tagAdminService.update(values.id, values)
        : await tagAdminService.create(values);
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

  const handleDelete = async (row: TagDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        try {
          await tagAdminService.delete(row.id);
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

  const actionDom = (row: TagDto) => {
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

  const columns: ProColumns<TagDto>[] = [
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
      title: l('EntityType'),
      dataIndex: 'entityType',
      width: 160,
      search: false,
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
  ];

  const entityTypeDom = () => {
    if (tagModel?.id) {
      return <></>;
    }

    return (
      <ProFormSelect
        name="entityType"
        label={l('EntityType')}
        showSearch
        request={async () => {
          const definitions = await tagAdminService.getTagDefinitions();
          const labels = definitions.map((c) => {
            return {
              label: c.displayName,
              value: c.entityType,
            };
          });
          console.log(labels);
          return labels || [];
        }}
        rules={[
          {
            required: true,
            message: l('The {0} field is required.', l('EntityType')),
            whitespace: true,
          },
        ]}
      />
    );
  };

  return (
    <PageContainer>
      <ProTable<TagDto>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            maxResultCount: params.pageSize,
            skipCount: ((params.current || 1) - 1) * (params.pageSize || 10),
            ...params,
          };
          const result = await tagAdminService.getList(requestData);
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
            <PlusOutlined /> {l('NewTag')}
          </Button>,
        ]}
      />

      <ModalForm<TagDto>
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
        {entityTypeDom()}
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
