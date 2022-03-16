import React, { useEffect, useState, useRef } from 'react';
import { message, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import Tinymce from '@/pages/components/Tinymce';

import { BlogPostDto } from '@/services/cms-kit-admin/dtos/BlogPostDto';
import blogPostAdminService from '@/services/cms-kit-admin/blog-post-admin-service';
import blogAdminService from '@/services/cms-kit-admin/blog-admin-service';
import entityTagAdminService from '@/services/cms-kit-admin/entity-tag-admin-service';
import tagPublicService from '@/services/cms-kit/tag-public-service';

export type EditBlogPostFormProps = {
  params: {
    id?: string;
    title: string;
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const EditBlogPostForm: React.FC<EditBlogPostFormProps> = (props) => {
  const params = props.params;
  const [form] = Form.useForm();

  const editorRef = useRef<any>();
  const [content, setContent] = useState<{ content: string }>();

  const l = props.simpleAbpUtils.localization.getResource('CmsKit');

  useEffect(() => {
    const fetchData = async () => {
      if (!params.visible) {
        return;
      }

      if (params.id) {
        const hide = message.loading(l('LoadingWithThreeDot'), 0);

        const detail = await blogPostAdminService.get(params.id);
        setContent({ content: detail.content });
        form.setFieldsValue(detail);

        const tagsResult = await tagPublicService.getAllRelatedTags('BlogPost', params.id);
        var tags = tagsResult.map((c) => c.name).join(',');
        form.setFieldsValue({ tags });
        hide();
      }
    };

    fetchData();
  }, [params]);

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      values['content'] = editorRef.current.getContent();

      const result = props.params.id
        ? await blogPostAdminService.update(props.params.id, values)
        : await blogPostAdminService.create(values);

      const tagsStr: string = form.getFieldValue('tags');
      if (!props.params.id && tagsStr) {
        await entityTagAdminService.setEntityTags({
          entityId: result.id,
          entityType: 'BlogPost',
          tags: tagsStr
            .split(',')
            .map((x) => x.trim())
            .filter((x) => x),
        });
      }

      message.success(l('SuccessfullySaved'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      hide();
    }
  };

  const handleEeditorChange = (editorState: any) => {};

  return (
    <ModalForm<BlogPostDto>
      title={params.title}
      form={form}
      modalProps={{ centered: true }}
      visible={params.visible}
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
        <ProFormSelect
          name="blogId"
          label={l('BlogId')}
          showSearch
          request={async () => {
            const blogs = await blogAdminService.getList({
              skipCount: 0,
              maxResultCount: 1000,
            });
            const labels = blogs.items?.map((c) => {
              return {
                label: c.name,
                value: c.id,
              };
            });
            console.log(labels);
            return labels || [];
          }}
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('BlogId')),
              whitespace: true,
            },
          ]}
        />
        <ProFormText
          name="title"
          label={l('Title')}
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
          rules={[
            {
              required: true,
              message: l('The {0} field is required.', l('Slug')),
              whitespace: true,
            },
          ]}
        />
        <ProFormTextArea name="shortDescription" label={l('ShortDescription')} />
        <ProFormText name="tags" label={l('Tags')} />
        <Tinymce
          value={content?.content}
          onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={(newVal, editor) => setContent({ content: newVal })}
          init={{ height: 500 }}
        />
      </div>
    </ModalForm>
  );
};
export default EditBlogPostForm;
