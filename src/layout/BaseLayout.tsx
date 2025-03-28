import React from 'react';
import { Outlet } from 'react-router-dom';

import { ConfigProvider, Layout } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';

import styles from './BaseLayout.module.scss';
import { projectTheme } from '@/styles/theme';

const BaseLayout = () => {
  return (
    <ConfigProvider locale={ru_RU} theme={projectTheme}>
      <Layout id="main-view" className={styles.layout}>
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
