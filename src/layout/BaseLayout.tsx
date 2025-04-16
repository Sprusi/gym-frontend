import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ConfigProvider, Layout } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';
import dayjs from 'dayjs';

import styles from './BaseLayout.module.scss';
import { flmsTheme } from '@/styles/theme';

const { Content } = Layout;

dayjs.locale('ru');

export const BaseLayout: FC = () => {
  return (
    <ConfigProvider locale={ru_RU} theme={flmsTheme}>
      <Layout id="main-view" className={styles.layout}>
        <Content className={styles.contentArea}>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
