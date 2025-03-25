import React from 'react';

import { Card, Flex, Row, Space, Typography } from 'antd';

import styles from './LessonsInfoCards.module.scss';
import { lessonsInfoCardsData } from './settings';

export const LessonsInfoCards = () => {
  return (
    <Row justify="space-between">
      {lessonsInfoCardsData.map((el, i) => (
        <Card key={i} className={styles.card}>
          <div className={`${styles.cardBorderItem} ${styles[el.className]}`} />
          <Flex vertical align="center">
            <Space direction="vertical" className={styles.cardSpace}>
              <Typography.Text strong className={styles.cardTitle}>
                {el.title}
              </Typography.Text>
              <Typography.Text className={styles.cardSuptitle}>{el.subTitle}</Typography.Text>
            </Space>
          </Flex>
        </Card>
      ))}
    </Row>
  );
};
