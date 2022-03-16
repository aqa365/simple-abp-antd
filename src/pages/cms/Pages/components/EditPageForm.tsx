import React, { useEffect, useState, useRef } from 'react';
import { message, Form, Tabs } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import Tinymce from '@/pages/components/Tinymce';

import { PageDto } from '@/services/cms-kit-admin/dtos/PageDto';
import pageAdminService from '@/services/cms-kit-admin/page-admin-service';
import cloudStorageService from '@/services/cloud-storage/cloud-storage-service';

const { TabPane } = Tabs;
export type EditPageFormProps = {
  params: {
    id?: string;
    title: string;
    isModalVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const EditPageForm: React.FC<EditPageFormProps> = (props) => {
  const params = props.params;
  const [form] = Form.useForm();
  const editorRef = useRef<any>();
  const [content, setContent] = useState<{ content: string }>();

  const l = props.simpleAbpUtils.localization.getResource('CmsKit');

  useEffect(() => {
    const fetchData = async () => {
      if (!params.isModalVisible) {
        return;
      }

      if (params.id) {
        const hide = message.loading(l('LoadingWithThreeDot'), 0);
        const detail = await pageAdminService.get(params.id);
        setContent({
          content: detail.content,
        });
        form.setFieldsValue(detail);
        hide();
      }
    };

    fetchData();
  }, [params]);

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      values['content'] = editorRef.current.getContent();
      props.params.id
        ? await pageAdminService.update(props.params.id, values)
        : await pageAdminService.create(values);
      message.success(l('SuccessfullySaved'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  return (
    <ModalForm<PageDto>
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
        const result = await handleSubmit(values);
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
          name="slug"
          label={l('Slug')}
          placeholder={l('EnterYourFiled', l('Slug').toLowerCase())}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Slug')),
              whitespace: true,
            },
          ]}
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab={l('Content')} key="1">
            <Tinymce
              value={content?.content}
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(newVal, editor) => setContent({ content: newVal })}
              init={{ height: 500 }}
            />
          </TabPane>
          <TabPane tab={l('Script')} key="2">
            <ProFormTextArea
              name="script"
              label={l('Script')}
              placeholder={l('EnterYourFiled', l('Script').toLowerCase())}
            />
          </TabPane>
          <TabPane tab={l('Style')} key="3">
            <ProFormTextArea
              name="style"
              label={l('Style')}
              placeholder={l('EnterYourFiled', l('Style').toLowerCase())}
            />
          </TabPane>
        </Tabs>
      </div>
    </ModalForm>
  );
};
export default EditPageForm;
