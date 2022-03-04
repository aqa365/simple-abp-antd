import React, { useState, useRef } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import EditUserForm from './components/EditUserForm';
import PermissionModal from '@/pages/identityManagement/Permissions/components/Permission';
import { GetIdentityUsersInput } from '@/services/identity/dtos/GetIdentityUsersInput';
import { IdentityUserDto } from '@/services/account/dtos/IdentityUserDto';
import identityUserService from '@/services/identity/identity-user-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [editModalTitle, handleEditModalTitle] = useState<string>('');
  const [modalPermissionVisible, setModalPermissionVisible] = useState<boolean>(false);
  const [modalPermissionKey, setModalPermissionKey] = useState<string>('');

  const [editId, handleEditId] = useState<string>('');
  const actionRef = useRef<ActionType>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = simpleAbpUtils.auth.isGranted;

  const handleEditUser = async (row: IdentityUserDto) => {
    handleEditModalTitle(l('Edit'));
    handleEditId(row.id);
    handleEditModalVisible(true);
  };

  const handleCreateUser = () => {
    handleEditModalTitle(l('NewUser'));
    handleEditId('');
    handleEditModalVisible(true);
  };

  const handlePermission = (row: IdentityUserDto) => {
    setModalPermissionKey(row.id);
    setModalPermissionVisible(true);
  };
  const actionDom = (row: IdentityUserDto) => {
    return (
      <Menu key={row.id + 'menu'}>
        <Menu.Item
          disabled={!g('AbpIdentity.Users.Update')}
          key={row.id + 'EditUser'}
          onClick={async () => await handleEditUser(row)}
        >
          {l('Edit')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Users.Update')} key={row.id + 'Claims'}>
          {l('Claims')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Users.Update')} key={row.id + 'Lock'}>
          {l('Lock')}
        </Menu.Item>
        <Menu.Item
          disabled={!g('AbpIdentity.Users.ManagePermissions')}
          key={row.id + 'Permissions'}
          onClick={async () => await handlePermission(row)}
        >
          {l('Permissions')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Users.Update')} key={row.id + 'SetPassword'}>
          {l('SetPassword')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Users.Update')} key={row.id + 'Twofactor'}>
          {l('TwoFactorVerification')}
        </Menu.Item>
        <Menu.Item disabled={!g('AbpIdentity.Users.Delete')} key={row.id + 'Delete'}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<IdentityUserDto>[] = [
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
      title: l('UserName'),
      sorter: true,
      fieldProps: {
        placeholder: l('EnterYourFiled', l('UserName').toLowerCase()),
      },
      dataIndex: 'userName',
    },
    {
      title: l('EmailAddress'),
      dataIndex: 'email',
      search: false,
      sorter: true,
    },
    {
      title: l('PhoneNumber'),
      dataIndex: 'phoneNumber',
      search: false,
      sorter: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<IdentityUserDto>
        actionRef={actionRef}
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          const requestData = {
            pageIndex: params.current,
            pageSize: params.pageSize,
            filter: params.userName,
          };
          const result = await identityUserService.getList(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        search={{
          searchText: l('Query'),
          resetText: l('Reset'),
        }}
        toolBarRender={() => [
          <Button
            disabled={!g('AbpIdentity.Users.Create')}
            type="primary"
            key="primary"
            onClick={handleCreateUser}
          >
            <PlusOutlined /> {l('NewUser')}
          </Button>,
        ]}
        pagination={{
          showTotal: (total) => `${total} ${l('Total')}`,
          locale: {
            items_per_page: l('Entries'),
          },
        }}
      />

      <EditUserForm
        key="EditUserForm"
        onSubmit={async () => {
          handleEditModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          handleEditModalVisible(false);
        }}
        title={editModalTitle}
        modalVisible={editModalVisible}
        id={editId}
      />

      <PermissionModal
        key={'PermissionModal'}
        onCancel={() => {
          setModalPermissionVisible(false);
        }}
        onSubmit={async () => {
          //setModalPermissionVisible(true);
        }}
        modalVisible={modalPermissionVisible}
        providerName="U"
        providerKey={modalPermissionKey}
      />
    </PageContainer>
  );
};

export default TableList;
