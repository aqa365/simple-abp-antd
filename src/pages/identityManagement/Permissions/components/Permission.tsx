import React, { useState, useEffect } from 'react';
import { Tabs, Divider, Checkbox, message } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import { getPermissions, setPermissions } from '@/services/simple-abp/identity/permission-service';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import simpleAbp from '@/utils/simple-abp';

const { TabPane } = Tabs;

export type PermissionModalProps = {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  modalVisible: boolean;
  providerName: string;
  providerKey: string;
};

const PermissionModal: React.FC<PermissionModalProps> = (props) => {
  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpPermissionManagement');

  const [permission, setPermission] = useState<Identity.Permission>({
    entityDisplayName: '',
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!props.modalVisible) return;

      if (permission.groups.length > 1) {
        permission.groups.forEach((c) => {
          c.permissions.forEach((c1) => {
            c1.isGranted = false;
          });
        });
        setPermission({
          ...permission,
        });
      }

      const hide = message.loading(l('LoadingWithThreeDot'), 0);
      const result = await getPermissions({
        providerName: props.providerName,
        providerKey: props.providerKey,
      });
      hide();
      setPermission(result);
    };

    fetchData();
  }, [props]);

  const grantAllPermissionsChnange = (e: CheckboxChangeEvent) => {
    permission.groups.forEach((c) =>
      c.permissions.forEach((c) => {
        if (!isDisabled(c.grantedProviders)) {
          c.isGranted = e.target.checked;
        }
      }),
    );
    setPermission({ ...permission });
  };

  const selctedAllChange = (e: CheckboxChangeEvent, index: number) => {
    permission.groups[index].permissions.forEach((c) => {
      if (!isDisabled(c.grantedProviders)) {
        c.isGranted = e.target.checked;
      }
    });
    setPermission({ ...permission });
  };

  const permissionChange = (
    e: CheckboxChangeEvent,
    item: Identity.PermissionItem,
    index: number,
  ) => {
    if (!isDisabled(item.grantedProviders)) {
      item.isGranted = e.target.checked;
      setPermission({ ...permission });
    }
  };

  const handleSubmit = async () => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);

    const body: any = {
      permissions: [],
    };

    permission.groups.forEach((c) =>
      c.permissions.forEach((c1) => {
        if (!isDisabled(c1.grantedProviders)) {
          body.permissions.push({
            name: c1.name,
            isGranted: c1.isGranted,
          });
        }
      }),
    );

    try {
      await setPermissions(
        {
          providerName: props.providerName,
          providerKey: props.providerKey,
        },
        body,
      );
      message.success(l('SavedSuccessfully'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const isDisabled = (grantedProviders: { providerName: string; providerKey: string }[]) => {
    if (grantedProviders.length <= 0) {
      return false;
    }

    const existProviderName =
      grantedProviders.filter((c) => c.providerName === props.providerName).length > 0;

    return !existProviderName;
  };

  const drawTabPaneDom = () => {
    return permission?.groups?.map((item, index) => {
      const groupPermission = permission.groups[index].permissions;
      const grantedCount = groupPermission.filter((c) => c.isGranted).length;
      return (
        <TabPane tab={item.displayName + '(' + grantedCount + ')'} key={item.name + 'TabPane'}>
          <h3>{item.displayName}</h3>
          <Divider style={{ marginTop: 0, marginBottom: 10 }} />
          <Checkbox
            key={item.name + 'Checkbox'}
            onChange={(e) => {
              selctedAllChange(e, index);
            }}
            indeterminate={groupPermission.length > grantedCount && grantedCount > 0}
            checked={groupPermission.length == grantedCount}
          >
            {l('SelectAllInThisTab')}
          </Checkbox>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          {item.permissions.map((child, childIndex) => {
            if (!child.parentName) {
              return (
                <div key={child.name + 'div'} style={{ width: 400, marginTop: 10 }}>
                  <Checkbox
                    disabled={isDisabled(child.grantedProviders)}
                    key={child.name + 'Checkbox'}
                    onChange={(e) => {
                      permissionChange(e, child, childIndex);
                    }}
                    checked={child.isGranted}
                  >
                    {child.displayName}
                  </Checkbox>
                </div>
              );
            }

            return (
              <div key={child.name + 'div'} style={{ marginLeft: 20, marginTop: 5 }}>
                <Checkbox
                  disabled={isDisabled(child.grantedProviders)}
                  key={child.name + 'Checkbox'}
                  onChange={(e) => {
                    permissionChange(e, child, childIndex);
                  }}
                  checked={child.isGranted}
                >
                  {child.displayName}
                </Checkbox>
              </div>
            );
          })}
        </TabPane>
      );
    });
  };

  const notGrantCount = permission.groups.filter(
    (f) => f.permissions.filter((f1) => !f1.isGranted).length > 0,
  ).length;

  return (
    <ModalForm
      key={'PermissionModal'}
      modalProps={{ centered: true }}
      width={650}
      title={l('Permissions') + ' - ' + l('Manager')}
      visible={props.modalVisible}
      submitter={{
        searchConfig: {
          submitText: l('Save'),
          resetText: l('Cancel'),
        },
      }}
      onVisibleChange={(visible) => {
        if (!visible) props.onCancel();
      }}
      onFinish={handleSubmit}
    >
      <WaterMark content={simpleAbpUtils.currentUser.getWaterMark()}>
        <Checkbox
          key={'grantAllPermissionsChnange'}
          onChange={grantAllPermissionsChnange}
          indeterminate={notGrantCount > 0 && notGrantCount < permission.groups.length}
          checked={notGrantCount == 0}
        >
          {l('SelectAllInAllTabs')}
        </Checkbox>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Tabs
          animated
          tabBarGutter={10}
          tabPosition={'top'}
          type="card"
          size={'small'}
          style={{ height: 500, overflowY: 'scroll' }}
        >
          {drawTabPaneDom()}
        </Tabs>
      </WaterMark>
    </ModalForm>
  );
};

export default PermissionModal;
