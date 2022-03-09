import React from 'react';
import { Tabs, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import simpleAbp from '@/utils/simple-abp';
import AntdThemeSettings from './components/AntdThemeSettings';

const { TabPane } = Tabs;
const SettingsManager: React.FC = () => {
  const simpleAbpUtils = new simpleAbp.SimpleAbpUtils();
  const identityL = simpleAbpUtils.localization.getResource('AbpIdentity');
  const accountL = simpleAbpUtils.localization.getResource('AbpAccount');
  const antdThemeL = simpleAbpUtils.localization.getResource('SimpleAbpAntdTheme');

  const g = simpleAbpUtils.auth.isGranted;
  return (
    <PageContainer>
      <Card>
        <Tabs tabPosition="left" tabBarGutter={20}>
          <TabPane tab={antdThemeL('Menu:AntdTheme')} key="AntdTheme">
            <AntdThemeSettings simpleAbpUtils={simpleAbpUtils} />
          </TabPane>
          <TabPane tab={identityL('Menu:IdentityManagement')} key="IdentityManagement">
            {identityL('Menu:IdentityManagement')}
          </TabPane>
          <TabPane tab={accountL('Menu:Account')} key="Account">
            {accountL('Menu:Account')}
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default SettingsManager;
