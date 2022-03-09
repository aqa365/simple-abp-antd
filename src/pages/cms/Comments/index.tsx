import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import simpleAbp from '@/utils/simple-abp';
import CommentTableList from './components/CommentTableList';

const TableList: React.FC = () => {
  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  return (
    <PageContainer>
      <CommentTableList simpleAbpUtils={simpleAbpUtils} />
    </PageContainer>
  );
};

export default TableList;
