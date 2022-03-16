import React from 'react';
import simpleLanguage from '@/utils/simple-language';
import { Editor } from '@tinymce/tinymce-react';
import pluginsDefault from './plugins-default';
import toolbarDefault from './toolbar-default';
import cloudStorageService from '@/services/cloud-storage/cloud-storage-service';
import simpleAbp from '@/utils/simple-abp';

export type TinymceProps = {
  init?: any;
  value?: string;
  initialValue?: string;
  onEditorChange?: (newValue: any, editor: any) => void;
  onInit?: (evt: any, editor: any) => void;
  images_upload_handler?: (blobInfo: any, success: any, failure: any) => void;
};

const Tinymce: React.FC<TinymceProps> = (props) => {
  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const sourceUrl = simpleAbpUtils.setting.getAntdThemeSettingValue('SourceUrl');
  const tinymceScriptSrc = `${sourceUrl}/tinymce/tinymce.min.js`;
  const language = simpleLanguage.convertToTinymceEditorLanguage();
  return (
    <Editor
      tinymceScriptSrc={tinymceScriptSrc}
      onInit={props.onInit}
      onEditorChange={props.onEditorChange}
      value={props.value}
      initialValue={props.initialValue ?? ''}
      init={{
        language: language,
        menubar: true,
        plugins: pluginsDefault,
        toolbar: toolbarDefault,
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_handler:
          props.images_upload_handler ??
          ((blobInfo, success, failure) => {
            const blob = blobInfo.blob();
            if (!blob) return;
            const formData = new window.FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            cloudStorageService
              .postFile(formData)
              .then((url) => {
                success(url);
              })
              .catch((error) => {
                failure(error);
              });
          }),
        ...props.init,
      }}
    />
  );
};

export default Tinymce;
