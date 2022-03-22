import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Switch, Form, Modal, message, TreeSelect } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
  ProFormSelect,
  ProFormSlider,
} from '@ant-design/pro-form';
import {
  PlusOutlined,
  SettingOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import simpleAbp from '@/utils/simple-abp';

import { WeaponConfigDto } from '@/services/venom/dtos/Aim/WeaponConfigDto';
import aimService from '@/services/venom/aim-service';
import appConfigService from '@/services/venom/application-configuration-service';

const aimConfig = aimService.get();
const keys = appConfigService.getKeys();

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [model, setModel] = useState<WeaponConfigDto>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  const [active, setActive] = useState<boolean>(aimConfig?.active || false);

  useEffect(() => {
    const setData = () => {
      if (modalVisible) {
        form.setFieldsValue(model);
      }
    };
    setData();
  }, [modalVisible]);

  const handleEdit = async (row: WeaponConfigDto) => {
    setModalTitle(l('Edit'));
    setModel(row);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setModalTitle(l('New'));
    setModel(undefined);
    setModalVisible(true);
  };

  const handleSubmit = async (values: WeaponConfigDto) => {
    console.log(values);
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    if (model) {
      aimService.updateWeaponConfig(values);
    } else {
      aimService.createWeaponConfig(values);
    }
    actionRef.current?.reload();
    hide();
  };

  const handleDelete = async (row: WeaponConfigDto) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        aimService.deleteWeaponConfig(row.name);
        actionRef.current?.reload();
        message.success(l('SuccessfullyDeleted'));
        hide();
      },
    });
  };

  const actionDom = (row: WeaponConfigDto) => {
    return (
      <Menu key={row.name + 'menu'}>
        <Menu.Item key={row.name + 'Edit'} onClick={() => handleEdit(row)}>
          {l('Edit')}
        </Menu.Item>
        <Menu.Item key={row.name + 'Delete'} onClick={() => handleDelete(row)}>
          {l('Delete')}
        </Menu.Item>
      </Menu>
    );
  };

  const columns: ProColumns<WeaponConfigDto>[] = [
    {
      title: l('Actions'),
      search: false,
      dataIndex: '',
      width: 160,
      render: (text, record, _, action) => [
        <Dropdown overlay={actionDom(record)} trigger={['click']} key={record.name + 'Dropdown'}>
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
      search: false,
    },
    {
      title: l('ActiveWeapons'),
      dataIndex: 'activeWeapons',
      width: 160,
      search: false,
      render: (text, row, index) => {
        const weaponNames: string[] = [];
        const weapons = appConfigService.getWeapons();
        weapons.forEach((p) =>
          p.children.forEach((c) => {
            if (row.activeWeapons.indexOf(c.value) >= 0) {
              weaponNames.push(c.title);
            }
          }),
        );
        return weaponNames.join(',');
      },
    },
    {
      title: l('BindKey'),
      dataIndex: 'bindKey',
      width: 160,
      search: false,
      render: (text, row, index) => {
        return row.displayBindKey;
      },
    },
    {
      title: l('Position'),
      dataIndex: 'position',
      width: 160,
      search: false,
      render: (text, row, index) => {
        const positionNames: string[] = [];
        row.position.forEach((c) => {
          switch (c) {
            case 8:
              positionNames.push('Head');
              break;
            case 7:
              positionNames.push('Neck');
              break;
            case 6:
              positionNames.push('Chest');
              break;
          }
        });
        return positionNames.join(',');
      },
    },
    {
      title: l('Distance'),
      dataIndex: 'distance',
      width: 160,
      search: false,
    },
    {
      title: l('Speed'),
      dataIndex: 'speed',
      width: 160,
      search: false,
    },
    {
      title: l('ShootsFiredScope'),
      dataIndex: 'shootsFiredScope',
      width: 160,
      search: false,
      render: (text, row, index) => {
        if (!row.shootsFiredScope) {
          row.shootsFiredScope = [];
        }
        return row.shootsFiredScope?.join('-');
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<WeaponConfigDto>
        actionRef={actionRef}
        rowKey={(d) => d.name}
        request={async (params, sort, filter) => {
          const aimModels = aimService.getWeaponConfigList();
          return {
            data: aimModels,
            total: aimModels.length,
            success: true,
          };
        }}
        search={false}
        columns={columns}
        options={false}
        headerTitle={
          <Switch
            checked={active}
            onChange={(checked) => {
              aimService.enable(checked);
              setActive(checked);
            }}
          />
        }
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreate}>
            <PlusOutlined /> {l('NewConfig')}
          </Button>,
        ]}
      />
      <ModalForm<WeaponConfigDto>
        title={modalTitle}
        form={form}
        modalProps={{ centered: true }}
        visible={modalVisible}
        width="auto"
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
        <ProFormText
          name="name"
          disabled={model ? true : false}
          label={l('Name')}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Name')),
              whitespace: true,
            },
          ]}
        />
        <ProForm.Group>
          <ProFormTreeSelect
            width="sm"
            name="activeWeapons"
            label={l('ActiveWeapons')}
            request={async () => {
              return appConfigService.getWeapons();
            }}
            fieldProps={{
              treeDefaultExpandAll: true,
              fieldNames: {
                label: 'title',
              },
              treeCheckable: true,
              showCheckedStrategy: TreeSelect.SHOW_CHILD,
            }}
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('WeaponType')),
              },
            ]}
            placeholder={l('EnterYourFiled', l('WeaponType').toLowerCase())}
          />
          <ProFormSlider name="distance" label={l('Distance')} width="sm" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSelect
            options={keys}
            width="sm"
            name="bindKey"
            label={l('BindKey')}
            showSearch
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('BindKey')),
              },
            ]}
          />
          <ProFormSlider name="speed" label={l('Speed')} width="sm" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            fieldProps={{
              mode: 'multiple',
            }}
            options={[
              {
                value: 8,
                label: 'Head',
              },
              {
                value: 7,
                label: 'Neck',
              },
              {
                value: 6,
                label: 'Chest',
              },
            ]}
            width="sm"
            name="position"
            label={l('Position')}
            rules={[
              {
                required: true,
                message: l('The {0} field is required.', l('Position')),
              },
            ]}
          />
          <ProFormSlider range name="shootsFiredScope" label={l('ShootsFiredScope')} width="sm" />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
