import React, { useRef, useState } from 'react';
import { Tag, Button, Descriptions, Modal, Tabs, message, Collapse } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { getAuditLogById, getAuditLogs } from '@/services/simple-abp/audit-log-service';
import simpleAbp from '@/utils/simple-abp';
const { TabPane } = Tabs;
const { Panel } = Collapse;
function jsonFormat(format: string) {
  let msg = '',
    pos = 0,
    prevChar = '',
    outOfQuotes = true;
  for (let i = 0; i < format.length; i++) {
    //循环每一个字符
    let char = format.substring(i, i + 1); //获取到该字符
    if (char == '"' && prevChar != '\\') {
      //如果转移
      outOfQuotes = !outOfQuotes;
    } else if ((char == '}' || char == ']') && outOfQuotes) {
      //如果是关闭
      msg += '<br/>';
      pos--;
      for (let j = 0; j < pos; j++) msg += '    ';
    }
    msg += char;
    if ((char == ',' || char == '{' || char == '[') && outOfQuotes) {
      msg += '<br/>';
      if (char == '{' || char == '[') pos++;
      for (let k = 0; k < pos; k++) msg += '    ';
    }
    prevChar = char;
  }
  return msg;
}
const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const l = simpleAbpUtils.localization.getResource('AbpAuditLogging');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<Simple.Abp.AuditLog>();

  const handleShowDetail = async (id: string) => {
    const hide = message.loading(l('LoadingWithThreeDot'), 0);
    const result = await getAuditLogById(id);
    setAuditLog(result);
    hide();
    setIsModalVisible(true);
  };

  const columns: ProColumns<Simple.Abp.AuditLog>[] = [
    {
      title: l('Actions'),
      search: false,
      width: 120,
      render: (text, record, _, action) => [
        <Button
          type="primary"
          key={record.id + 'Detail'}
          onClick={() => handleShowDetail(record.id)}
        >
          <FileSearchOutlined />
          {l('Detail')}
        </Button>,
      ],
    },
    {
      order: 99,
      title: l('ExecutionTime'),
      valueType: 'dateRange',
      dataIndex: 'executionTime',
      hideInTable: true,
      search: {
        transform: (value: any) => ({
          startTime: value[0] + ' 00:00:00',
          endTime: value[1] + ' 23:59:59',
        }),
      },
    },

    {
      title: l('HttpRequest'),
      dataIndex: 'url',
      search: false,
      sorter: false,
      render: (text, row, index) => {
        if (row.httpStatusCode >= 200 && row.httpStatusCode < 300) {
          return (
            <>
              <Tag style={{ float: 'left' }} color="success">
                {row.httpStatusCode}
              </Tag>
              <Tag style={{ float: 'left' }} color="success">
                {row.httpMethod}
              </Tag>
              {text}
            </>
          );
        }

        if (row.httpStatusCode >= 300 && row.httpStatusCode < 400) {
          return (
            <>
              <Tag style={{ float: 'left' }} color="default">
                {row.httpStatusCode}
              </Tag>
              <Tag style={{ float: 'left' }} color="default">
                {row.httpMethod}
              </Tag>
              {text}
            </>
          );
        }

        if (row.httpStatusCode >= 400 && row.httpStatusCode < 500) {
          return (
            <>
              <Tag style={{ float: 'left' }} color="warning">
                {row.httpStatusCode}
              </Tag>
              <Tag style={{ float: 'left' }} color="warning">
                {row.httpMethod}
              </Tag>
              {text}
            </>
          );
        }

        return (
          <>
            <Tag style={{ float: 'left' }} color="error">
              {row.httpStatusCode}
            </Tag>
            <Tag style={{ float: 'left' }} color="error">
              {row.httpMethod}
            </Tag>
            {text}
          </>
        );
      },
    },
    {
      order: 98,
      title: l('UserName'),
      dataIndex: 'userName',
      sorter: true,
    },
    {
      order: 93,
      title: l('ClientIpAddress'),
      dataIndex: 'clientIpAddress',
      hideInTable: true,
      sorter: true,
    },
    {
      title: l('ExecutionTime'),
      search: false,
      sorter: true,
      dataIndex: 'executionTime',
    },
    {
      order: 97,
      title: l('UrlFilter'),
      hideInTable: true,
      dataIndex: 'url',
    },
    {
      order: 96,
      title: l('MinDuration'),
      hideInTable: true,
      dataIndex: 'minExecutionDuration',
      valueType: 'digit',
    },
    {
      order: 95,
      title: l('MaxDuration'),
      hideInTable: true,
      dataIndex: 'maxExecutionDuration',
      valueType: 'digit',
    },
    {
      order: 94,
      title: l('HttpMethod'),
      hideInTable: true,
      dataIndex: 'httpMethod',
      valueType: 'select',
      valueEnum: {
        '': { text: ' ' },
        GET: { text: 'GET' },
        POST: { text: 'POST' },
        PUT: { text: 'PUT' },
        DELETE: { text: 'DELETE' },
      },
    },
    {
      order: 93,
      title: l('HttpStatusCode'),
      hideInTable: true,
      dataIndex: 'httpStatusCode',
      valueType: 'digit',
    },
    {
      order: 92,
      title: l('ApplicationName'),
      hideInTable: true,
      dataIndex: 'applicationName',
    },
    {
      order: 91,
      title: l('CorrelationId'),
      hideInTable: true,
      dataIndex: 'correlationId',
    },
    {
      order: 90,
      title: l('HasException'),
      hideInTable: true,
      valueType: 'select',
      dataIndex: 'hasException',
      valueEnum: {
        '': { text: ' ' },
        true: { text: 'True' },
        false: { text: 'False' },
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<Simple.Abp.AuditLog>
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
          const result = await getAuditLogs(requestData);
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
        <Tabs defaultActiveKey="1" style={{ height: 500, overflowY: 'scroll' }}>
          <TabPane tab={l('Overall')} key="1">
            <Descriptions
              bordered
              layout="vertical"
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label={l('ApplicationName')}>
                {auditLog?.applicationName}
              </Descriptions.Item>
              <Descriptions.Item label={l('UserName')}>{auditLog?.userName}</Descriptions.Item>
              <Descriptions.Item label={l('HttpMethod')}>{auditLog?.httpMethod}</Descriptions.Item>
              <Descriptions.Item label={l('HttpStatusCode')}>
                {auditLog?.httpStatusCode}
              </Descriptions.Item>
              <Descriptions.Item label={l('ExecutionTime')}>
                {auditLog?.executionTime}
              </Descriptions.Item>
              <Descriptions.Item label={l('Duration')}>
                {auditLog?.executionDuration}
              </Descriptions.Item>
              <Descriptions.Item label={l('ClientIpAddress')} span={2}>
                {auditLog?.clientIpAddress}
              </Descriptions.Item>
              <Descriptions.Item label={l('Url')} span={2}>
                {auditLog?.url}
              </Descriptions.Item>
              <Descriptions.Item label={l('BrowserInfo')} span={2}>
                {auditLog?.browserInfo}
              </Descriptions.Item>
              <Descriptions.Item label={l('CorrelationId')} span={2}>
                {auditLog?.correlationId}
              </Descriptions.Item>
              <Descriptions.Item label={l('Comments')} span={2}>
                {auditLog?.comments}
              </Descriptions.Item>
              <Descriptions.Item label={l('Extraproperties')} span={2}>
                {auditLog?.extraProperties.toString()}
              </Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab={l('Actions')} key="2">
            <Collapse defaultActiveKey={['1']}>
              {auditLog?.actions.map((c) => {
                return (
                  <Panel header={c.serviceName} key={'Panel' + c.id}>
                    <p>
                      {l('Duration')} {c.executionDuration}ms
                    </p>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: l('Parameters') + jsonFormat(c.parameters),
                      }}
                    ></div>
                  </Panel>
                );
              })}
            </Collapse>
          </TabPane>
        </Tabs>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
