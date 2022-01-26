import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormDigit,
  ProFormGroup,
} from '@ant-design/pro-form';
import {
  getArticle,
  createArticle,
  updateArticle,
} from '@/services/simple-abp/articles/article-service';
import SelectCatalog from '@/pages/articles/Catalog/components/SelectCatalog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type EditArticleFormProps = {
  params: {
    id?: string;
    title: string;
    isModalVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};
const EditArticleForm: React.FC<EditArticleFormProps> = (props) => {
  const params = props.params;
  const [form] = Form.useForm();
  const l = props.simpleAbpUtils.localization.getResource('SimpleAbpArticles');

  const handleEdit = async (values: Articles.Catalog) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      if (values.parentId) {
        values.parentId = values.parentId['value'];
      }
      values.id ? await updateArticle(values.id, values) : await createArticle(values);
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
      width={1100}
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
      <div style={{ height: 500, overflowY: 'scroll' }}>
        <ProFormText name="id" hidden />
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
          name="seoPath"
          label={l('SeoPath')}
          placeholder={l('EnterYourFiled', l('SeoPath').toLowerCase())}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('SeoPath')),
              whitespace: true,
            },
          ]}
        />
        <SelectCatalog params={{ name: 'catalogId' }} />
        <ProFormText
          name="tag"
          label={l('Tag')}
          placeholder={l('EnterYourFiled', l('Tag').toLowerCase())}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Tag')),
              whitespace: true,
            },
          ]}
        />
        <ProFormTextArea
          name="summary"
          label={l('Summary')}
          placeholder={l('EnterYourFiled', l('Summary').toLowerCase())}
        />

        <ProFormGroup label={l('Special')}>
          <ProFormSwitch name="isTop" label={l('IsTop')} />
          <ProFormSwitch name="isRefinement" label={l('IsRefinement')} />
        </ProFormGroup>

        <ProFormDigit
          name="order"
          label={l('Order')}
          fieldProps={{
            defaultValue: 0,
          }}
        />
        <ReactQuill theme="snow" />
      </div>
    </ModalForm>
  );
};

export default EditArticleForm;
