import { Space, Avatar, Menu } from 'antd';
import React from 'react';
import { useModel, SelectLang, setLocale } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import HeaderDropdown from '../HeaderDropdown';
import HeaderSearch from '../HeaderSearch';

import styles from './index.less';
import simpleLanguage from '@/utils/simple-language';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const currentLanguage = initialState?.appInfo?.localization?.languages?.find(
    (c) => c.cultureName === initialState?.appInfo?.localization?.currentCulture?.cultureName,
  );

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        options={[]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <AvatarDropdown />
      <HeaderDropdown
        overlay={() => {
          return (
            <Menu className={styles.menu}>
              {initialState.appInfo?.localization?.languages?.map((item, index) => {
                return (
                  <Menu.Item
                    key={'languages' + index}
                    onClick={() => {
                      simpleLanguage.setLanguage(item?.cultureName || '');
                      setLocale(simpleLanguage.convertToAntdLanguage(item?.cultureName || ''));
                    }}
                  >
                    <Avatar
                      style={{ top: '-2px' }}
                      size={18}
                      className={styles.avatar}
                      src={'/language/' + item.flagIcon}
                      alt="avatar"
                    />
                    <span style={{ marginLeft: '.5rem' }}>{item.displayName}</span>
                  </Menu.Item>
                );
              })}
            </Menu>
          );
        }}
      >
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size={18}
            className={styles.avatar}
            src={'/language/' + currentLanguage?.flagIcon}
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>{currentLanguage?.displayName}</span>
        </span>
      </HeaderDropdown>
    </Space>
  );
};
export default GlobalHeaderRight;
