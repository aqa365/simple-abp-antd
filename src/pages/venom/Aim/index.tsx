import React, { useState, useEffect } from 'react';
import { Button, Switch, Form, Modal, message, TreeSelect, Card, Badge, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
  ProFormSelect,
  ProFormCheckbox,
  ProFormDigit,
  ProFormDigitRange,
} from '@ant-design/pro-form';
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import simpleAbp from '@/utils/simple-abp';

import { WeaponConfigDto } from '@/services/venom/dtos/Aim/WeaponConfigDto';
import aimService from '@/services/venom/aim-service';
import appConfigService from '@/services/venom/application-configuration-service';

const { Meta } = Card;
const aimConfig = aimService.get();
const keys = appConfigService.getKeys();

const TableList: React.FC = () => {
  const [form] = Form.useForm();

  const [model, setModel] = useState<WeaponConfigDto>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [weaponConfigs, setWeaponConfigs] = useState<WeaponConfigDto[]>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('CmsKit');
  const g = simpleAbpUtils.auth.isGranted;

  const [active, setActive] = useState<boolean>(aimConfig?.active || false);

  useEffect(() => {
    const setData = () => {
      loadWeaponConfigList();
      if (modalVisible) {
        form.setFieldsValue(model);
      }
    };
    setData();
  }, [modalVisible]);

  const loadWeaponConfigList = () => {
    const weaponConfigList = aimService.getWeaponConfigList();
    setWeaponConfigs(weaponConfigList);
  };

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
    message.success(l('SuccessSaved'));
    loadWeaponConfigList();
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
        message.success(l('SuccessfullyDeleted'));
        loadWeaponConfigList();
        hide();
      },
    });
  };

  return (
    <PageContainer>
      <Card
        bordered={false}
        title={
          <Switch
            checked={active}
            onChange={(checked) => {
              aimService.enable(checked);
              setActive(checked);
            }}
          />
        }
        extra={
          <Button type="primary" key="primary" onClick={handleCreate}>
            <PlusOutlined /> {l('NewWeaponConfig')}
          </Button>
        }
      >
        {weaponConfigs?.map((c) => (
          <Badge
            status={'default'}
            key={'Badge' + c.name}
            offset={[-60, 20]}
            count={c.displayBindKey}
          >
            <Card
              key={'Card' + c.name}
              size="small"
              style={{ width: 300, float: 'left', margin: '0 20px 20px 20px' }}
              actions={[
                <Switch
                  size="small"
                  key={'active' + c.name}
                  checked={c.active}
                  onChange={(checked) => {
                    c.active = checked;
                    aimService.updateWeaponConfig(c);
                    loadWeaponConfigList();
                  }}
                />,
                <EditOutlined key={'edit' + c.name} onClick={() => handleEdit(c)} />,
                <DeleteOutlined key={'delete' + c.name} onClick={() => handleDelete(c)} />,
              ]}
            >
              <Meta
                style={{ height: 110 }}
                title={c.name}
                description={appConfigService.getWeaponNames(c.activeWeapons).map((w) => (
                  <Tag color="default">{w}</Tag>
                ))}
              />
            </Card>
          </Badge>
        ))}
      </Card>
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
        <ProFormCheckbox name="active" hidden />
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
          <ProFormDigitRange
            fieldProps={{
              min: 0,
              max: 100,
              precision: 0,
            }}
            name="shootsFiredScope"
            label={l('ShootsFiredScope')}
          />
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
          <ProFormDigit
            name="distance"
            label={l('Distance')}
            min={0}
            max={100}
            fieldProps={{ precision: 1 }}
          />
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
          <ProFormDigit
            name="speed"
            label={l('Speed')}
            min={0}
            max={100}
            fieldProps={{ precision: 1 }}
          />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
