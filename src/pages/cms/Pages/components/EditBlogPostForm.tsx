import React, { useEffect, useState } from 'react';
import { message, Form, Tabs } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import simpleLanguage from '@/utils/simple-language';
import { uploads } from '@/services/simple-abp/simple-abp-cloud-storage';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

import { PageDto } from '@/services/cms-kit-admin/dtos/PageDto';
import pageAdminService from '@/services/cms-kit-admin/page-admin-service';
const { TabPane } = Tabs;
export type EditFormProps = {
  params: {
    id?: string;
    title: string;
    isModalVisible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const EditForm: React.FC<EditFormProps> = (props) => {
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
        const detail = await pageAdminService.get(params.id);
        form.setFieldsValue(detail);
        setEditor({
          state: BraftEditor.createEditorState(detail.content),
        });
        hide();
      }
    };

    fetchData();
  }, [params]);

  const handleSubmit = async (values: any) => {
    const hide = message.loading(l('SavingWithThreeDot'), 0);
    try {
      values['content'] = editor.state.toHTML();
      props.params.id
        ? await pageAdminService.update(props.params.id, values)
        : await pageAdminService.create(values);
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
        <ProFormTextArea
          name="shortDescription"
          label={l('ShortDescription')}
          placeholder={l('EnterYourFiled', l('ShortDescription').toLowerCase())}
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab={l('Content')} key="1">
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
export default EditForm;
