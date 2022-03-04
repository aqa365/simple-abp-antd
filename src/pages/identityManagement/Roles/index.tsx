import React, { useState, useRef } from 'react';
import { Menu, Dropdown, Button, Form, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import roleService from '@/services/identity/identity-role-service';
import PermissionModal from '@/pages/identityManagement/Permissions/components/Permission';
import { WaterMark } from '@ant-design/pro-layout';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalPermissionVisible, setModalPermissionVisible] = useState<boolean>(false);
  const [modalPermissionKey, setModalPermissionKey] = useState<string>('');
  const [editIdentityRole, setEditIdentityRole] = useState<Identity.IdentityRole>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = simpleAbpUtils.auth.isGranted;

  const [form] = Form.useForm();

  const handleEditRole = (row: Identity.IdentityRole) => {
    setModalTitle(l('Edit'));
    setEditIdentityRole(row);
    setModalVisible(true);
  };

  const handleCreateRole = () => {
    setModalTitle(l('NewRole'));
    setEditIdentityRole(undefined);
    setModalVisible(true);
  };

  const handlePermission = (row: any) => {
    setModalPermissionKey(row.name);
    setModalPermissionVisible(true);
  };

  const handleSubmit = async (id: string, values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      if (id) await roleService.update(id, values);
      else await roleService.create(values);
      message.success(l('SavedSuccessfully'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const actionDom = (row: Identity.IdentityRole) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item
          disabled={!g('AbpIdentity.Roles.Update')}
          key={row.id + 'Edit'}
          onClick={() => handleEditRole(row)}
        >
          {l('Edit')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Roles.Update')} key={row.id + 'Claims'}>
          {l('Claims')}
        </Menu.Item>
        <Menu.Item
          disabled={!g('AbpIdentity.Roles.ManagePermissions')}
          key={row.id + 'Permissions'}
          onClick={() => handlePermission(row)}
        >
          {l('Permissions')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Roles.Delete')} key={row.id + 'Delete'}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<Identity.IdentityRole>[] = [
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
      title: l('RoleName'),
      sorter: true,
      dataIndex: 'name',
      fieldProps: {
        placeholder: l('EnterYourFiled', l('RoleName').toLowerCase()),
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<Identity.IdentityRole>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            pageIndex: params.current,
            pageSize: params.pageSize,
            filter: params.name,
          };
          const result = await roleService.getList(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        search={{
          searchText: l('Query'),
          resetText: l('Reset'),
        }}
        options={false}
        toolBarRender={() => [
          <Button
            disabled={!g('AbpIdentity.Roles.Create')}
            type="primary"
            key="primary"
            onClick={handleCreateRole}
          >
            <PlusOutlined /> {l('NewRole')}
          </Button>,
        ]}
        pagination={{
          showTotal: (total) => `${total} ${l('Total')}`,
          locale: {
            items_per_page: l('Entries'),
          },
        }}
      />

      <ModalForm<any>
        form={form}
        title={modalTitle}
        visible={modalVisible}
        submitter={{
          searchConfig: {
            submitText: l('Save'),
            resetText: l('Cancel'),
          },
        }}
        onVisibleChange={(visible) => {
          if (visible) {
            form.resetFields();
            if (editIdentityRole) {
              form.setFieldsValue(editIdentityRole);
            }
            return;
          }
          setModalVisible(false);
        }}
        onFinish={async (values) => {
          const result = await handleSubmit(values.id, values);
          if (result) {
            setModalVisible(false);
            actionRef.current?.reload();
          }
        }}
      >
        <WaterMark content={simpleAbpUtils.currentUser.getWaterMark()}>
          <ProFormText
            name="name"
            label={l('RoleName')}
            placeholder={l('EnterYourFiled', l('RoleName').toLowerCase())}
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('RoleName')),
                whitespace: true,
              },
            ]}
          />
          <ProFormText hidden name="id" />
          <ProFormText hidden name="concurrencyStamp" />
          <ProFormCheckbox name="isDefault">{l('DisplayName:IsDefault')}</ProFormCheckbox>
          <ProFormCheckbox name="isPublic">{l('DisplayName:IsPublic')}</ProFormCheckbox>
        </WaterMark>
      </ModalForm>
      <PermissionModal
        key={'PermissionModal'}
        onCancel={() => {
          setModalPermissionVisible(false);
        }}
        onSubmit={async () => {
          //setModalPermissionVisible(true);
        }}
        modalVisible={modalPermissionVisible}
        providerName="R"
        providerKey={modalPermissionKey}
      />
    </PageContainer>
  );
};

export default TableList;
