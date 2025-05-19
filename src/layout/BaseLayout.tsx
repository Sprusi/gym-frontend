import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
import dayjs from 'dayjs';

import styles from './BaseLayout.module.scss';

const { Content } = Layout;

dayjs.locale('ru');

export const BaseLayout: FC = () => {
  return (
    <Layout id="main-view" className={styles.layout}>
      <Content className={styles.contentArea}>
        <Outlet />
      </Content>
    </Layout>
  );
};
