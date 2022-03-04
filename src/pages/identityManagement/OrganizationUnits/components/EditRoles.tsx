import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Alert } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { WaterMark } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { IdentityRoleDto } from '@/services/identity/dtos/IdentityRoleDto';
import roleService from '@/services/identity/identity-role-service';
import organizationUnitService from '@/services/identity/organization-unit-service';

export type EditRolesProps = {
  params: {
    organizationUnitId: string;
    organizationUnitName: string;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const EditRoles: React.FC<EditRolesProps> = (props) => {
  const params = props.params;
  const l = props.simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = props.simpleAbpUtils.auth.isGranted;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSave, setLoadingSaveLoading] = useState<boolean>(false);

  const [roles, setRoles] = useState<IdentityRoleDto[]>();
  const [selectRoleIds, setSelectRoleIds] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (!params.organizationUnitId) return;
      await loadData();
    };

    fetchData();
  }, [params]);

  const loadData = async () => {
    setLoading(true);

    const result = await organizationUnitService.getRoles(params.organizationUnitId, {
      skipCount: 0,
      maxResultCount: 1000,
    });

    setLoading(false);
    setRoles(result.items);
    setSelectRoleIds(result.items?.map((c) => c.id));
  };

  const addRoles = () => {
    setIsModalVisible(true);
  };

  const handleAddRoles = async () => {
    setLoadingSaveLoading(true);
    try {
      await organizationUnitService.addRoles(params.organizationUnitId, { roleIds: selectRoleIds });
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
    const role = roles?.find((c) => c.id === id);
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('RemoveRoleFromOuWarningMessage', params.organizationUnitName, role?.name || ''),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);

        try {
          await organizationUnitService.removeRole(params.organizationUnitId, id);
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

  const columns: ProColumns<IdentityRoleDto>[] = [
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
      title: l('DisplayName:RoleName'),
      sorter: true,
      dataIndex: 'name',
      search: false,
    },
  ];

  const selectRoleColumns: ProColumns<IdentityRoleDto>[] = [
    {
      title: l('DisplayName:RoleName'),
      sorter: true,
      dataIndex: 'name',
    },
  ];

  if (!params.organizationUnitId) {
    return <Alert message={l('SelectAnOrganizationUnitToSeeRoles')} type="info" showIcon />;
  }

  return (
    <>
      <ProTable<IdentityRoleDto>
        rowKey={(d) => d.id}
        columns={columns}
        search={false}
        options={false}
        loading={loading}
        dataSource={roles}
        toolBarRender={() => [
          <Button
            //disabled={!g('AbpIdentity.Roles.Create')}
            type="primary"
            key="primary"
            onClick={addRoles}
          >
            <PlusOutlined /> {l('AddRole')}
          </Button>,
        ]}
        pagination={false}
      />
      <Modal
        title={l('SelectRoles')}
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
          <Button loading={loadingSave} key="submit" type="primary" onClick={handleAddRoles}>
            {l('Save')}
          </Button>,
        ]}
      >
        <WaterMark content={props.simpleAbpUtils.currentUser.getWaterMark()}>
          <ProTable<IdentityRoleDto>
            rowKey={(d) => d.id}
            columns={selectRoleColumns}
            rowSelection={{
              selectedRowKeys: selectRoleIds,
              onChange: (selectedRowKeys) => {
                setSelectRoleIds(selectedRowKeys);
              },
              getCheckboxProps: (record) => {
                const role = roles?.find((c) => c.id == record.id);
                const exist = role ? true : false;
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
              const result = await roleService.getList(requestData);
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
export default EditRoles;
