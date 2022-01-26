import React, { useState, useEffect } from 'react';
import { message, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import {
  getCatalogAll,
  getCatalog,
  createCatalog,
  updateCatalog,
} from '@/services/simple-abp/articles/catalog-service';
import { convertToArticleCatalogTreeSelect } from '@/utils/tree';

export type EditCatalogFormProps = {
  params: {
    id?: string;
    title: string;
    isModalVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};
const EditCatalogForm: React.FC<EditCatalogFormProps> = (props) => {
  const params = props.params;
  const [form] = Form.useForm();
  const l = props.simpleAbpUtils.localization.getResource('AbpAuditLogging');

  useEffect(() => {
    const fetchData = async () => {
      if (!params.isModalVisible) {
        return;
      }

      if (params.id) {
        const hide = message.loading(l('LoadingWithThreeDot'), 0);
        const catalogDetail = await getCatalog(params.id);
        form.setFieldsValue(catalogDetail);
        hide();
      }
    };

    fetchData();
  }, [params]);

  const handleEdit = async (values: Articles.Catalog) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      if (values.parentId) {
        values.parentId = values.parentId['value'];
      }
      values.id ? await updateCatalog(values.id, values) : await createCatalog(values);
      message.success(l('SavedSuccessfully'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  return (
    <ModalForm<Articles.Catalog>
      title={params.title}
      form={form}
      modalProps={{ centered: true }}
      visible={params.isModalVisible}
      width={640}
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

        params.onCancel();
      }}
      onFinish={async (values) => {
        const result = await handleEdit(values);
        if (result) params.onSubmit();
      }}
    >
      <ProFormText
        name="title"
        label={l('Title')}
        placeholder={l('EnterYourFiled', l('Title').toLowerCase())}
        rules={[
          {
            required: true,
            message: l('The {0} field is required.', l('Title')),
            whitespace: true,
          },
        ]}
      />

      <ProFormText
        name="description"
        label={l('Description')}
        placeholder={l('EnterYourFiled', l('Description').toLowerCase())}
      />
      <ProFormText name="id" hidden />
      <ProFormTreeSelect
        name="parentId"
        placeholder="Please select"
        allowClear
        secondary
        request={async () => {
          const catatlogAll = await getCatalogAll();
          const treeData = convertToArticleCatalogTreeSelect(null, catatlogAll, params.id);
          return treeData;
        }}
        // tree-select args
        fieldProps={{
          showArrow: false,
          dropdownMatchSelectWidth: false,
          treeDefaultExpandAll: true,
          treeLine: { showLeafIcon: false },
          labelInValue: true,
          fieldNames: {
            value: 'value',
          },
        }}
      />
    </ModalForm>
  );
};

export default EditCatalogForm;
