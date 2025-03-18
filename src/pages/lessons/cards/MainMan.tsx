import React from 'react';

import { Card } from 'antd';

import styles from './MainMan.module.scss';

export const MainMan = () => {
  return (
    <Card className={styles.card}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};
