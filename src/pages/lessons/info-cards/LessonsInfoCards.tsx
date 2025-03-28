import React from 'react';

import { Card, Col, Flex, Row, Space, Typography } from 'antd';

import styles from './LessonsInfoCards.module.scss';
import { lessonsInfoCardsData } from './settings';

export const LessonsInfoCards = () => {
  const colCount = 24 / lessonsInfoCardsData.length;

  return (
    <Row justify="space-between" gutter={[16, 16]} wrap align="top">
      {lessonsInfoCardsData.map((el, i) => (
        <Col key={i} span={colCount}>
          <Card className={styles.card}>
            <div className={`${styles.cardBorderItem} ${styles[el.className]}`} />
            <Flex vertical align="center">
              <Space direction="vertical" size="small" className={styles.cardSpace}>
                <Typography.Text>{el.title}</Typography.Text>
                <Typography.Text className={styles.cardSuptitle}>{el.subTitle}</Typography.Text>
              </Space>
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
