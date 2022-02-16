import React, { useEffect, useState } from 'react';
import { message, Form } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
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
import { getTagAll } from '@/services/simple-abp/articles/tag-service';
import SelectCatalog from '@/pages/articles/Catalog/components/SelectCatalog';
import simpleLanguage from '@/utils/simple-language';
import { uploads } from '@/services/simple-abp/simple-abp-cloud-storage';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

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
  const [editor, setEditor] = useState<any>({
    state: BraftEditor.createEditorState(null),
  });
  const l = props.simpleAbpUtils.localization.getResource('SimpleAbpArticles');

  useEffect(() => {
    const fetchData = async () => {
      if (!params.isModalVisible) {
        return;
      }

      if (params.id) {
        const hide = message.loading(l('LoadingWithThreeDot'), 0);
        const articleDetail = await getArticle(params.id);
        form.setFieldsValue(articleDetail);
        setEditor({
          state: BraftEditor.createEditorState(articleDetail.content),
        });
        hide();
      }
    };

    fetchData();
  }, [params]);

  const handleEdit = async (values: Articles.Article) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      values['content'] = editor.state.toHTML();
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

  const handleEeditorChange = (editorState: any) => {
    setEditor({
      state: editorState,
      outputHTML: editorState.toHTML(),
    });
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
        <ProFormSelect
          name="tag"
          label={l('Tag')}
          showSearch
          request={async () => {
            const tags = await getTagAll();
            const labels = tags.map((c) => {
              return {
                label: c.name,
                value: c.name,
              };
            });
            console.log(labels);
            return labels;
          }}
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
        <BraftEditor
          language={simpleLanguage.convertToBraftEditorLanguage()}
          value={editor.state}
          onChange={handleEeditorChange}
          media={{
            uploadFn: (param) => {
              const formData = new FormData();
              formData.append('file', param.file);
              uploads(formData)
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
export default EditArticleForm;
