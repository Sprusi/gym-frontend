import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import classNames from 'classnames';
import dayjs from 'dayjs';

import styles from './BaseLayout.module.scss';
import { useCommonMenu } from './useCommonMenu';

const { Content } = Layout;

dayjs.locale('ru');

export const BaseLayout: FC = () => {
  const { menuItems, menuKey, handleMenuChange } = useCommonMenu();
  const microfrontSider = window.IS_MICROFRONTEND ? styles.layoutSiderMicrofront : '';
  const microfrontInner = window.IS_MICROFRONTEND ? styles.layoutInnerMicrofront : '';

  useEffect(() => {
    const hostHeader = document.querySelector('.header-root') as HTMLElement;
    if (hostHeader) {
      hostHeader.style.position = 'fixed';
      hostHeader.style.width = 'calc(100% - 80px)';
      hostHeader.style.zIndex = '5';
      document.documentElement.lang = 'ru';
    }
  }, []);

  return (
    <Layout id="main-view" className={styles.layout}>
      <Sider
        theme={'dark'}
        trigger={null}
        collapsible
        collapsed={true}
        className={classNames(styles.layoutSider, microfrontSider)}
      >
        <Menu
          theme={'dark'}
          mode="vertical"
          items={menuItems}
          selectedKeys={menuKey ? [menuKey] : []}
          onClick={handleMenuChange}
          className={styles.layoutSiderMenu}
        />
      </Sider>
      <Layout className={classNames(styles.layoutInner, microfrontInner)}>
        <Content className={styles.contentArea}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
