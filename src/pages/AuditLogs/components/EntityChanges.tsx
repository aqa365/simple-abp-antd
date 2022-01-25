import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getEntityChanges } from '@/services/simple-abp/audit-log-service';
import ReactJson from 'react-json-view';

export type EntityChangesProps = {
  simpleAbpUtils: Utils.ISimpleAbpUtils;
};

const EntityChanges: React.FC<EntityChangesProps> = (props) => {
  const l = props.simpleAbpUtils.localization.getResource('AbpAuditLogging');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [detailTitle, setDetailTitle] = useState<any>();
  const [detailData, setDetailData] = useState<any>();

  const columns: ProColumns<Simple.Abp.EntityChange>[] = [
    {
      title: l('Actions'),
      search: false,
      width: 120,
      render: (text, record, _, action) => [
        <Button
          type="primary"
          key={record.id + 'Detail'}
          onClick={() => {
            setIsModalVisible(true);
            const properties = {};
            record.propertyChanges.forEach((c) => {
              properties[c.propertyName] = {
                originalValue: c.originalValue,
                newValue: c.newValue,
                propertyTypeFullName: c.propertyTypeFullName,
                id: c.id,
                entityChangeId: c.entityChangeId,
              };
            });
            setDetailTitle(record.entityTypeFullName);
            setDetailData(properties);
          }}
        >
          <FileSearchOutlined />
          {l('Detail')}
        </Button>,
      ],
    },
    {
      title: l('ChangeTime'),
      valueType: 'dateRange',
      dataIndex: 'changeTime',
      hideInTable: true,
      search: {
        transform: (value: any) => ({
          startDate: value[0] + ' 00:00:00',
          endDate: value[1] + ' 23:59:59',
        }),
      },
    },
    {
      title: l('ChangeType'),
      dataIndex: 'changeType',
      valueType: 'select',
      valueEnum: {
        '': { text: ' ' },
        0: { text: 'Created' },
        1: { text: 'Updated' },
        2: { text: 'Deleted' },
      },
    },
    {
      title: l('TenantId'),
      dataIndex: 'tenantId',
      sorter: true,
    },
    {
      title: l('EntityTypeFullName'),
      dataIndex: 'entityTypeFullName',
      sorter: true,
    },
  ];
  return (
    <>
      <ProTable<Simple.Abp.EntityChange>
        rowKey={(d) => d.id}
        request={async (params, sort, filter) => {
          console.log(params);
          console.log(filter);
          const requestData = {
            pageIndex: params.current,
            pageSize: params.pageSize,
            filter: params.userName,
            ...params,
          };
          const result = await getEntityChanges(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        search={{
          labelWidth: 150,
          defaultCollapsed: false,
        }}
        pagination={{
          showTotal: (total) => `${total} ${l('Total')}`,
          locale: {
            items_per_page: l('Entries'),
          },
        }}
      />
      <Modal
        centered
        title={l('Detail')}
        visible={isModalVisible}
        width={700}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        onOk={() => {
          setIsModalVisible(false);
        }}
      >
        <div style={{ maxHeight: 500, overflowY: 'scroll' }}>
          <ReactJson src={detailData} name={detailTitle} />
        </div>
      </Modal>
    </>
  );
};

export default EntityChanges;
