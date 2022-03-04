import React, { ReactNode, useEffect, useState } from 'react';
import { Tabs, Form, message, Tree } from 'antd';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import { convertToOrganizationUnitsTree } from '@/utils/tree';
import simpleAbp from '@/utils/simple-abp';
import { IdentityUserDto } from '@/services/account/dtos/IdentityUserDto';
import { OrganizationUnitDto } from '@/services/identity/dtos/OrganizationUnitDto';
import identityUserService from '@/services/identity/identity-user-service';

const { TabPane } = Tabs;
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<IdentityUserDto>;

export type EditFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: () => Promise<void>;
  title: string;
  id: string;
  modalVisible: boolean;
};

const EditUserForm: React.FC<EditFormProps> = (props) => {
  const [form] = Form.useForm();

  const [roles, setRoles] = useState<{ label: ReactNode; value: string; disabled?: boolean }[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const [userOrganizationUnitIds, setUserOrganizationUnitIds] = useState<any>([]);
  const [organizationUnitsTreeData, setOrganizationUnitsTreeData] = useState<any>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');

  useEffect(() => {
    const fetchData = async () => {
      if (!props.modalVisible) return;

      setUserRoles([]);
      const hide = message.loading(l('LoadingWithThreeDot'), 0);

      const getAssignableRolesAsync = identityUserService.getAssignableRoles();
      const getAvailableOrganizationUnitsAsync =
        identityUserService.getAvailableOrganizationUnits();

      var userOrganizationUnit: OrganizationUnitDto[] = [];

      if (props.id) {
        const getUserByIdAsync = identityUserService.get(props.id);
        const getUserRolesAsync = identityUserService.getRoles(props.id);
        const getUserOrganizationUnitsAsync = identityUserService.getOrganizationUnits(props.id);

        // user info
        const userDetail = await getUserByIdAsync;
        form.setFieldsValue(userDetail);

        // user roles
        const userRole = await getUserRolesAsync;
        setUserRoles(userRole.items.map((c) => c.name));

        // user organization units
        userOrganizationUnit = await getUserOrganizationUnitsAsync;
        setUserOrganizationUnitIds(userOrganizationUnit.map((c) => c.id));
      }

      // role
      const role = await getAssignableRolesAsync;
      setRoles(
        role.items.map((c) => {
          return {
            label: c.name,
            value: c.name,
            disabled:
              userOrganizationUnit.filter(
                (f) => f.roles.filter((rf) => rf.roleId == c.id).length > 0,
              ).length > 0,
          };
        }),
      );

      // organization units
      const organizationUnits = await getAvailableOrganizationUnitsAsync;
      const treeData = convertToOrganizationUnitsTree(null, organizationUnits.items);
      setOrganizationUnitsTreeData(treeData);

      hide();
    };

    fetchData();
  }, [props]);

  const handleEdit = async (id: string, values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    values.organizationUnitIds = userOrganizationUnitIds.checked || userOrganizationUnitIds;
    console.log(values);
    try {
      id ? await identityUserService.update(id, values) : await identityUserService.create(values);
      message.success(l('SavedSuccessfully'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handlePasswordDom = () => {
    if (props.id) {
      return (
        <>
          <ProFormText name="concurrencyStamp" hidden />
          <ProFormText name="id" hidden />
        </>
      );
    }

    return (
      <ProFormText.Password
        name="password"
        placeholder={l('EnterYourFiled', l('Password').toLowerCase())}
        label={l('Password')}
        rules={[
          {
            required: true,
            message: l('The {0} field is required.', l('Password')),
          },
        ]}
        hasFeedback
      />
    );
  };

  const modalDom = () => {
    return (
      <ModalForm<any>
        form={form}
        width={640}
        title={props.title}
        visible={props.modalVisible}
        modalProps={{ centered: true }}
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

          props.onCancel();
        }}
        onFinish={async (values) => {
          const result = await handleEdit(values.id, values);
          if (result) props.onSubmit();
        }}
      >
        <WaterMark content={simpleAbpUtils.currentUser.getWaterMark()}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={l('UserInformations')} key="1">
              <ProFormText
                name="userName"
                label={l('UserName')}
                placeholder={l('EnterYourFiled', l('UserName').toLowerCase())}
                rules={[
                  {
                    required: true,
                    message: l('The {0} field is required.', l('UserName')),
                    whitespace: true,
                  },
                ]}
              />
              {handlePasswordDom()}
              <ProFormText
                placeholder={l('EnterYourFiled', l('DisplayName:Name').toLowerCase())}
                name="name"
                label={l('DisplayName:Name')}
              />
              <ProFormText
                placeholder={l('EnterYourFiled', l('DisplayName:Surname').toLowerCase())}
                name="surname"
                label={l('DisplayName:Surname')}
              />
              <ProFormText
                name="email"
                placeholder={l('EnterYourFiled', l('EmailAddress').toLowerCase())}
                label={l('EmailAddress')}
                rules={[
                  {
                    type: 'email',
                    message: l('The {0} field is not a valid e-mail address.', l('EmailAddress')),
                  },
                  {
                    required: true,
                    message: l('The {0} field is required.', l('EmailAddress')),
                  },
                ]}
              />
              <ProFormText
                name="phoneNumber"
                placeholder={l('EnterYourFiled', l('PhoneNumber').toLowerCase())}
                label={l('PhoneNumber')}
                rules={[
                  {
                    message: l('The {0} field is not a valid phone number.', l('PhoneNumber')),
                  },
                ]}
              />
              <ProFormCheckbox name="lockoutEnabled">
                {l('DisplayName:LockoutEnabled')}
              </ProFormCheckbox>
            </TabPane>
            <TabPane tab={l('Roles')} key="2">
              <ProFormCheckbox.Group
                //initialValue={userRoles.map((c) => c.name)}
                fieldProps={{
                  value: userRoles,
                  onChange: (values) => {
                    setUserRoles(values.map((c) => c.toString()));
                  },
                }}
                options={roles}
                name="roleNames"
              />
            </TabPane>
            <TabPane tab={l('OrganizationUnits')} key="3">
              <Tree
                checkable
                defaultExpandAll
                checkStrictly
                blockNode
                checkedKeys={userOrganizationUnitIds}
                treeData={organizationUnitsTreeData}
                onCheck={(checked, e) => {
                  setUserOrganizationUnitIds(checked);
                }}
              />
            </TabPane>
          </Tabs>
        </WaterMark>
      </ModalForm>
    );
  };

  return modalDom();
};

export default EditUserForm;
