import React, { useEffect, useState } from 'react';
import { message, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import simpleLanguage from '@/utils/simple-language';
import cloudStorageService from '@/services/cloud-storage/cloud-storage-service';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

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
  const l = props.simpleAbpUtils.localization.getResource('CmsKit');

  const [editor, setEditor] = useState<any>({
    state: BraftEditor.createEditorState(null),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!params.visible) {
        return;
      }

      setEditor({
        state: BraftEditor.createEditorState(null),
      });

      if (params.id) {
        const hide = message.loading(l('LoadingWithThreeDot'), 0);

        const detail = await blogPostAdminService.get(params.id);
        form.setFieldsValue(detail);
        setEditor({
          state: BraftEditor.createEditorState(detail.content),
        });

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
      values['content'] = editor.state.toHTML();

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

  const handleEeditorChange = (editorState: any) => {
    setEditor({
      state: editorState,
      outputHTML: editorState.toHTML(),
    });
  };

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
        <BraftEditor
          language={simpleLanguage.convertToBraftEditorLanguage()}
          value={editor.state}
          onChange={handleEeditorChange}
          media={{
            uploadFn: (param) => {
              const formData = new FormData();
              formData.append('file', param.file);
              cloudStorageService
                .postFile(formData)
                .then((url) => {
                  param.success({
                    url: url,
                    meta: {
                      id: url,
                      title: param.file.name,
                      alt: param.file.name,
                      loop: false, // 指定音视频是否循环播放
                      autoPlay: false, // 指定音视频是否自动播放
                      controls: false, // 指定音视频是否显示控制栏
                      poster: '', // 指定视频播放器的封面
                    },
                  });
                })
                .catch((error) => {});
            },
          }}
        />
      </div>
    </ModalForm>
  );
};
export default EditBlogPostForm;
