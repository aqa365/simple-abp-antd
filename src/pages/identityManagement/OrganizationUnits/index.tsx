import React, { useState, useEffect } from 'react';
import { Row, Col, Tree, Menu, Dropdown, Button, message, Form, Modal } from 'antd';
import { PageContainer, WaterMark } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import {
  DownOutlined,
  EllipsisOutlined,
  TeamOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  getAllOrganizationUnits,
  createOrganizationUnit,
  updateOrganizationUnit,
  moveOrganizationUnit,
  deleteOrganizationUnit,
} from '@/services/simple-abp/identity/organization-unit-service';
import EditMembers from './components/EditMembers';
import EditRoles from './components/EditRoles';
import { convertToOrganizationUnitsTree } from '@/utils/tree';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = simpleAbpUtils.auth.isGranted;

  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState('Members');

  const [treeData, setTreeData] = useState<any>();
  const [allOrganizationUnits, setAllOrganizationUnits] = useState<Identity.OrganizationUnit[]>();
  const [editOrganizationUnit, setOrganizationUnit] =
    useState<Identity.CreateOrUpdateOrganizationUnit>();

  const [componentData, setComponentData] = useState({
    organizationUnitId: '',
    organizationUnitName: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getAllOrganizationUnits();
      setAllOrganizationUnits(result.items);
      setTreeData(convertToOrganizationUnitsTree(null, result.items, <TeamOutlined />));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };

    fetchData();
  }, []);

  const handleAddRootUnit = () => {
    setModalTitle(l('AddRootUnit'));
    setOrganizationUnit(undefined);
    setModalVisible(true);
  };
  const handleAddSubUnit = (id: string) => {
    setModalTitle(l('AddSubUnit'));
    setOrganizationUnit({ parentId: id });
    setModalVisible(true);
  };

  const handleEdit = (id: string) => {
    setModalTitle(l('Edit'));
    const organizationUnit = allOrganizationUnits?.find((c) => c.id === id);
    setOrganizationUnit(organizationUnit);
    setModalVisible(true);
  };

  const handleSubmit = async (values: Identity.CreateOrUpdateOrganizationUnit) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      const func = values.id ? updateOrganizationUnit : createOrganizationUnit;
      await func(values);
      message.success(l('SavedSuccessfully'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handleMove = async (info: any) => {
    setLoading(true);
    const hide = message.loading(l('SavingWithThreeDot'), 0);

    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;

    try {
      await moveOrganizationUnit({
        id: dragKey,
        newParentId: info?.dropToGap ? null : dropKey,
      });
      await loadData();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handleDelete = async (id: string) => {
    const organizationUnit = allOrganizationUnits?.find((c) => c.id === id);
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l(
        'OrganizationUnitDeletionConfirmationMessage',
        organizationUnit?.displayName || '',
      ),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        setLoading(true);
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);

        try {
          await deleteOrganizationUnit(id);
          await loadData();
          message.success(l('SuccessfullyDeleted'));
        } catch (error) {
          console.error(error);
        } finally {
          hide();
          setLoading(false);
        }
      },
    });
  };

  const handleComponentData = (id: string) => {
    if (componentData.organizationUnitId === id) {
      return;
    }

    const item = allOrganizationUnits?.find((c) => c.id == id);
    setComponentData({
      organizationUnitId: item?.id || '',
      organizationUnitName: item?.displayName || '',
    });
  };

  const handleClick = async (id: string) => {
    handleComponentData(id);
  };

  const menu = (id: string) => (
    <Menu>
      <Menu.Item
        disabled={!g('AbpIdentity.OrganizationUnits.ManageOU')}
        key={id + 'Edit'}
        onClick={() => handleEdit(id)}
      >
        {l('Edit')}
      </Menu.Item>
      <Menu.Item
        disabled={!g('AbpIdentity.OrganizationUnits.ManageOU')}
        key={id + 'AddSubUnit'}
        onClick={() => handleAddSubUnit(id)}
      >
        {l('AddSubUnit')}
      </Menu.Item>
      <Menu.Item
        disabled={!g('AbpIdentity.OrganizationUnits.ManageOU')}
        key={id + 'Delete'}
        onClick={() => handleDelete(id)}
      >
        {l('Delete')}
      </Menu.Item>
    </Menu>
  );

  return (
    <PageContainer>
      <Row gutter={24} wrap={true}>
        <Col lg={7} md={24} style={{ marginBottom: '10px' }}>
          <ProCard
            loading={loading}
            title={l('OrganizationTree')}
            style={{ width: '100%' }}
            extra={
              <Button type="primary" key="primary" onClick={handleAddRootUnit}>
                <PlusOutlined /> {l('AddRootUnit')}
              </Button>
            }
          >
            <Tree
              showIcon
              showLine={{ showLeafIcon: false }}
              blockNode
              defaultExpandAll
              switcherIcon={<DownOutlined />}
              treeData={treeData}
              draggable
              onDrop={handleMove}
              onSelect={(selectKeys, info) => {
                handleClick(info.node.key.toString());
              }}
              titleRender={(item) => {
                return (
                  <>
                    {item.title}
                    <Dropdown trigger={['click']} overlay={menu(item.key.toString())}>
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        &nbsp; &nbsp;
                        <EllipsisOutlined />
                      </a>
                    </Dropdown>
                  </>
                );
              }}
            />
          </ProCard>
        </Col>
        <Col lg={17} md={24}>
          <ProCard
            style={{ width: '100%', float: 'left' }}
            tabs={{
              activeKey: tab,
              onChange: (key) => {
                setTab(key);
              },
            }}
          >
            <ProCard.TabPane key="Members" tab={l('Members')}>
              <EditMembers params={componentData} simpleAbpUtils={simpleAbpUtils} />
            </ProCard.TabPane>
            <ProCard.TabPane key="Roles" tab={l('Roles')}>
              <EditRoles params={componentData} simpleAbpUtils={simpleAbpUtils} />
            </ProCard.TabPane>
          </ProCard>
        </Col>
      </Row>

      <ModalForm<Identity.CreateOrUpdateOrganizationUnit>
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
            if (editOrganizationUnit) {
              form.setFieldsValue(editOrganizationUnit);
            }
            return;
          }
          setModalVisible(false);
        }}
        onFinish={async (values) => {
          const result = await handleSubmit(values);
          if (result) {
            setModalVisible(false);
            await loadData();
          }
        }}
      >
        <WaterMark content={simpleAbpUtils.currentUser.getWaterMark()}>
          <ProFormText hidden name="id" />
          <ProFormText hidden name="parentId" />
          <ProFormText hidden name="concurrencyStamp" />
          <ProFormText
            name="displayName"
            label={l('DisplayName')}
            placeholder={l('EnterYourFiled', l('DisplayName').toLowerCase())}
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('DisplayName')),
                whitespace: true,
              },
            ]}
          />
        </WaterMark>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
