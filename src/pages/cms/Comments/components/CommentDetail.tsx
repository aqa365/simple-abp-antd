import React, { useEffect, useState } from 'react';
import { message, Modal, Descriptions } from 'antd';
import { CommentWithAuthorDto } from '@/services/cms-kit-admin/dtos/CommentWithAuthorDto';
import commentAdminService from '@/services/cms-kit-admin/comment-admin-service';
import CommentTableList from './CommentTableList';
export type DetailProps = {
  params: {
    id?: string;
    isModalVisible: boolean;
    onCancel: () => void;
  };
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const DetailModal: React.FC<DetailProps> = (props) => {
  const params = props.params;
  const [commentWithAuthorDto, setCommentWithAuthorDto] = useState<CommentWithAuthorDto>();

  const l = props.simpleAbpUtils.localization.getResource('SimpleAbpArticles');

  useEffect(() => {
    const fetchData = async () => {
      if (!params.isModalVisible) {
        return;
      }

      if (params.id) {
        const hide = message.loading(l('LoadingWithThreeDot'), 0);
        const detail = await commentAdminService.get(params.id);
        setCommentWithAuthorDto(detail);
        hide();
      }
    };

    fetchData();
  }, [params]);

  return (
    <Modal
      centered
      title={l('Detail')}
      visible={params.isModalVisible}
      width={700}
      onCancel={() => {
        params.onCancel();
      }}
      onOk={() => {
        params.onCancel();
      }}
    >
      <Descriptions
        bordered
        layout="vertical"
        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label={l('EntityType')}>
          {commentWithAuthorDto?.entityType}
        </Descriptions.Item>
        <Descriptions.Item label={l('EntityId')}>
          {commentWithAuthorDto?.entityId}
        </Descriptions.Item>
        <Descriptions.Item label={l('CreationTime')}>
          {commentWithAuthorDto?.creationTime}
        </Descriptions.Item>
        <Descriptions.Item label={l('UserName')}>
          {commentWithAuthorDto?.author.userName}
        </Descriptions.Item>
        <Descriptions.Item label={l('Text')} span={2}>
          {commentWithAuthorDto?.text}
        </Descriptions.Item>
      </Descriptions>
      <CommentTableList params={{ id: params.id }} simpleAbpUtils={props.simpleAbpUtils} />
    </Modal>
  );
};
export default DetailModal;
