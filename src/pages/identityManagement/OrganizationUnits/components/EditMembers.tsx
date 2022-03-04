import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Alert } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { WaterMark } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { IdentityUserDto } from '@/services/account/dtos/IdentityUserDto';
import userService from '@/services/identity/identity-user-service';
import organizationUnitService from '@/services/identity/organization-unit-service';

export type EditMembersProps = {
  params: {
    organizationUnitId: string;
    organizationUnitName: string;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const EditMembers: React.FC<EditMembersProps> = (props) => {
  const params = props.params;
  const l = props.simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = props.simpleAbpUtils.auth.isGranted;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSave, setLoadingSaveLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<IdentityUserDto[]>();
  const [selectUserIds, setSelectUserIds] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (!params.organizationUnitId) return;
      console.log(params.organizationUnitName);
      await loadData();
    };

    fetchData();
  }, [params]);

  const loadData = async () => {
    setLoading(true);

    const result = await organizationUnitService.getMembers(params.organizationUnitId, {
      pageIndex: 1,
      pageSize: 1000,
    });

    setLoading(false);
    setUsers(result.items);
    setSelectUserIds(result.items?.map((c) => c.id));
  };

  const addUsers = () => {
    setIsModalVisible(true);
  };

  const handleAddUsers = async () => {
    setLoadingSaveLoading(true);
    try {
      await organizationUnitService.addMembers(params.organizationUnitId, {
        userIds: selectUserIds,
      });
      message.success(l('SavedSuccessfully'));
      setIsModalVisible(false);
      loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSaveLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const user = users?.find((c) => c.id === id);
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l(
        'RemoveUserFromOuWarningMessage',
        params.organizationUnitName,
        user?.userName || '',
      ),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);

        try {
          await organizationUnitService.removeMember(params.organizationUnitId, id);
          message.success(l('SuccessfullyDeleted'));
          await loadData();
        } catch (error) {
          console.error(error);
        } finally {
          hide();
        }
      },
    });
  };

  const columns: ProColumns<IdentityUserDto>[] = [
    {
      title: l('Actions'),
      search: false,
      dataIndex: '',
      width: 160,
      render: (text, record, _, action) => [
        <Button key={'delete' + record.id} type="primary" onClick={() => handleDelete(record.id)}>
          {l('Delete')}
        </Button>,
      ],
    },
    {
      title: l('UserName'),
      sorter: true,
      dataIndex: 'userName',
      search: false,
    },
    {
      title: l('DisplayName:EmailAddress'),
      sorter: true,
      dataIndex: 'name',
      search: false,
    },
  ];

  const selectUserColumns: ProColumns<IdentityUserDto>[] = [
    {
      title: l('UserName'),
      sorter: true,
      dataIndex: 'userName',
    },
    {
      title: l('DisplayName:EmailAddress'),
      sorter: true,
      dataIndex: 'email',
      search: false,
    },
  ];

  if (!params.organizationUnitId) {
    return <Alert message={l('SelectAnOrganizationUnitToSeeMembers')} type="info" showIcon />;
  }

  return (
    <>
      <ProTable<IdentityUserDto>
        rowKey={(d) => d.id}
        columns={columns}
        search={false}
        options={false}
        loading={loading}
        dataSource={users}
        toolBarRender={() => [
          <Button
            //disabled={!g('AbpIdentity.Roles.Create')}
            type="primary"
            key="primary"
            onClick={addUsers}
          >
            <PlusOutlined /> {l('AddMember')}
          </Button>,
        ]}
        pagination={false}
      />
      <Modal
        title={l('SelectUsers')}
        visible={isModalVisible}
        centered={true}
        width={720}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            {l('Cancel')}
          </Button>,
          <Button loading={loadingSave} key="submit" type="primary" onClick={handleAddUsers}>
            {l('Save')}
          </Button>,
        ]}
      >
        <WaterMark content={props.simpleAbpUtils.currentUser.getWaterMark()}>
          <ProTable<IdentityUserDto>
            rowKey={(d) => d.id}
            columns={selectUserColumns}
            rowSelection={{
              selectedRowKeys: selectUserIds,
              onChange: (selectedRowKeys) => {
                setSelectUserIds(selectedRowKeys);
              },
              getCheckboxProps: (record) => {
                const user = users?.find((c) => c.id == record.id);
                const exist = user ? true : false;
                return {
                  disabled: exist, // Column configuration not to be checked
                  name: record.name,
                };
              },
            }}
            options={{
              search: {
                name: 'filter',
                placeholder: l('EnterYourFiled', l('UserName').toLowerCase()),
              },
            }}
            request={async (params, sort, filter) => {
              const requestData = {
                pageIndex: params.current,
                pageSize: params.pageSize,
                filter: params.filter,
              };
              const result = await userService.getList(requestData);
              return {
                data: result.items,
                total: result.totalCount,
                success: true,
              };
            }}
            search={false}
            pagination={{
              showTotal: (total) => `${total} ${l('Total')}`,
              locale: {
                items_per_page: l('Entries'),
              },
            }}
          />
        </WaterMark>
      </Modal>
    </>
  );
};

export default EditMembers;
