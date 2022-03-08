import React, { useState, useEffect } from 'react';
import { Row, Col, Tree, Menu, Dropdown, Button, message, Form, Modal } from 'antd';
import { PageContainer, WaterMark } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { ModalForm, ProFormText, ProFormCheckbox, ProFormDigit } from '@ant-design/pro-form';
import {
  DownOutlined,
  EllipsisOutlined,
  TeamOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { MenuItemDto } from '@/services/cms-kit/dtos/MenuItemDto';
import menuItemAdminService from '@/services/cms-kit-admin/menu-item-admin-service';
import { convertToCmsMenuItemsTree } from '@/utils/tree';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');
  const g = simpleAbpUtils.auth.isGranted;

  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [treeData, setTreeData] = useState<any>();

  const [menuItems, setMenuItems] = useState<MenuItemDto[]>();
  const [menuItem, setMenuItem] = useState<any>();

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await menuItemAdminService.getList();
      setMenuItems(result.items);
      setTreeData(convertToCmsMenuItemsTree(null, result.items || [], <TeamOutlined />));
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

  const handleAddMenuItem = () => {
    setModalTitle(l('AddMenuItem'));
    setMenuItem(undefined);
    setModalVisible(true);
  };
  const handleAddSubMenuItem = (id: string) => {
    setModalTitle(l('AddSubUnit'));
    setMenuItem({ parentId: id });
    setModalVisible(true);
  };

  const handleEditMenuItem = (id: string) => {
    setModalTitle(l('Edit'));
    const menuItem = menuItems?.find((c) => c.id === id);
    setMenuItem(menuItem);
    setModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      const func = values.id
        ? await menuItemAdminService.update(values.id, values)
        : await menuItemAdminService.create(values);
      message.success(l('SavedSuccessfully'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handleMoveMenuItem = async (info: any) => {
    setLoading(true);
    const hide = message.loading(l('SavingWithThreeDot'), 0);

    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;

    try {
      await menuItemAdminService.moveMenuItem(dragKey, {
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

  const handleDeleteMenuItem = async (id: string) => {
    const menuItem = menuItems?.find((c) => c.id === id);
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('OrganizationUnitDeletionConfirmationMessage', menuItem?.displayName || ''),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        setLoading(true);
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);

        try {
          await menuItemAdminService.delete(id);
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

  const menu = (id: string) => (
    <Menu>
      <Menu.Item
        //disabled={!g('AbpIdentity.OrganizationUnits.ManageOU')}
        key={id + 'Edit'}
        onClick={() => handleEditMenuItem(id)}
      >
        {l('Edit')}
      </Menu.Item>
      <Menu.Item
        //disabled={!g('AbpIdentity.OrganizationUnits.ManageOU')}
        key={id + 'AddSubMenuItem'}
        onClick={() => handleAddSubMenuItem(id)}
      >
        {l('AddSubMenuItem')}
      </Menu.Item>
      <Menu.Item
        //disabled={!g('AbpIdentity.OrganizationUnits.ManageOU')}
        key={id + 'Delete'}
        onClick={() => handleDeleteMenuItem(id)}
      >
        {l('Delete')}
      </Menu.Item>
    </Menu>
  );

  return (
    <PageContainer>
      <Tree
        showIcon
        showLine={{ showLeafIcon: false }}
        blockNode
        defaultExpandAll
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        draggable
        onDrop={handleMoveMenuItem}
        onSelect={(selectKeys, info) => {}}
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
            if (menuItem) {
              form.setFieldsValue(menuItem);
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
          <ProFormCheckbox name="isActive" />
          <ProFormDigit label="Order" name="order" min={1} max={10} />
          <ProFormText name="icon" label={l('Icon')} />
          <ProFormText name="target" label={l('Target')} />
          <ProFormText name="elementId" label={l('ElementId')} />
          <ProFormText name="cssClass" label={l('CssClass')} />
        </WaterMark>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
