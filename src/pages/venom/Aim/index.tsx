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

import { AimModelDto } from '@/services/venom/dtos/Aim/AimModelDto';
import venomAimService from '@/services/venom/venom-aim-service';
import venomBaseService from '@/services/venom/venom-base-service';

const aimConfig = venomAimService.get();
const keys = venomBaseService.getKeys();

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [model, setModel] = useState<AimModelDto>();
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

  const handleEdit = async (row: AimModelDto) => {
    setModalTitle(l('Edit'));
    setModel(row);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setModalTitle(l('New'));
    setModel(undefined);
    setModalVisible(true);
  };

  const handleSubmit = async (values: AimModelDto) => {
    console.log(values);
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    if (model) {
      venomAimService.updateAim(values);
      actionRef.current?.reload();
    } else {
      venomAimService.createAim(values);
      actionRef.current?.reload();
    }
    hide();
  };

  const handleDelete = async (row: any) => {
    Modal.confirm({
      title: l('AreYouSure'),
      icon: <ExclamationCircleOutlined />,
      content: l('GenericDeletionConfirmationMessage', row.name),
      okText: l('Delete'),
      cancelText: l('Cancel'),
      onOk: async () => {
        const hide = message.loading(l('ProcessingWithThreeDot'), 0);
        message.success(l('SuccessfullyDeleted'));
        hide();
      },
    });
  };

  const actionDom = (row: AimModelDto) => {
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

  const columns: ProColumns<AimModelDto>[] = [
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
      title: l('Weapons'),
      dataIndex: 'weapons',
      width: 160,
      search: false,
      render: (text, row, index) => {
        return row.weapons?.join(',');
      },
    },
    {
      title: l('BindKey'),
      dataIndex: 'bindKey',
      width: 160,
      search: false,
      render: (text, row, index) => {
        return row.bindKey;
      },
    },
    {
      title: l('Position'),
      dataIndex: 'position',
      width: 160,
      search: false,
      render: (text, row, index) => {
        return row.position?.join(',');
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
      <ProTable<AimModelDto>
        actionRef={actionRef}
        rowKey={(d) => d.name}
        request={async (params, sort, filter) => {
          const aimModels = venomAimService.getList();
          console.log(aimModels)
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
      <ModalForm<AimModelDto>
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
          disabled={model?true:false}
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
            name="weapons"
            label={l('Weapons')}
            request={async () =>{
              return venomBaseService.getWeapons();
            }}
            fieldProps={{
              treeDefaultExpandAll:true,
              fieldNames: {
                label: 'title',
              },
              treeCheckable: true,
              showCheckedStrategy: TreeSelect.SHOW_CHILD,
            }}
            placeholder={l('EnterYourFiled', l('WeaponType').toLowerCase())}
          />
          <ProFormSlider name="distance" label={l('Distance')} width="sm" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSelect
            fieldProps={{
              mode: 'multiple',
            }}
            options={keys}
            width="sm"
            name="bindKey"
            label={l('BindKey')}
            showSearch
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
          />
          <ProFormSlider range name="shootsFiredScope" label={l('ShootsFiredScope')} width="sm" />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
