import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { getSecurityLogs } from '@/services/simple-abp/identity/security-log-service';
import simpleAbp from '@/utils/simple-abp';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpIdentity');

  const columns: ProColumns<Identity.SecurityLog>[] = [
    {
      order: 99,
      title: l('CreationTime'),
      valueType: 'dateRange',
      dataIndex: 'creationTime',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startDateTime: value[0], endDateTime: value[1] }),
      },
    },
    {
      title: l('CreationTime'),
      search: false,
      sorter: true,
      dataIndex: 'creationTime',
      width: 150,
    },
    {
      order: 95,
      title: l('UserName'),
      dataIndex: 'userName',
      sorter: true,
      width: 120,
    },
    {
      order: 94,
      title: l('Action'),
      dataIndex: 'action',
      sorter: true,
      search: {
        transform: (value: any) => ({ actionName: value }),
      },
      width: 120,
    },
    {
      order: 93,
      title: l('ClientId'),
      dataIndex: 'ClientId',
      hideInTable: true,
      sorter: true,
      width: 120,
    },
    {
      title: l('ClientIpAddress'),
      dataIndex: 'clientIpAddress',
      search: false,
      width: 120,
    },
    {
      title: l('BrowserInfo'),
      dataIndex: 'browserInfo',
      ellipsis: true,
      search: false,
      width: 120,
    },
    {
      order: 97,
      title: l('ApplicationName'),
      dataIndex: 'applicationName',
      sorter: true,
      width: 120,
    },
    {
      order: 96,
      title: l('Identity'),
      dataIndex: 'identity',
      sorter: true,
      width: 120,
    },
    {
      order: 92,
      title: l('CorrelationId'),
      dataIndex: 'correlationId',
      hideInTable: true,
      sorter: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<Identity.SecurityLog>
        actionRef={actionRef}
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
          const result = await getSecurityLogs(requestData);
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
          };
        }}
        columns={columns}
        options={false}
        search={{
          labelWidth: 120,

          defaultCollapsed: false,
          searchText: l('Query'),
          resetText: l('Reset'),
        }}
        pagination={{
          showTotal: (total) => `${total} ${l('Total')}`,
          locale: {
            items_per_page: l('Entries'),
          },
        }}
      />
    </PageContainer>
  );
};

export default TableList;
