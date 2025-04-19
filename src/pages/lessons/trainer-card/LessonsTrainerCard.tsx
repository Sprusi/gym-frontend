/* eslint-disable i18n/no-russian-character */
import React from 'react';

import { Card, Col, Row, Space, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import styles from './LessonsTrainerCard.module.scss';

export const LessonsTrainerCard = () => {
  return (
    <Card className={styles.card}>
      <div className={`${styles.cardBorderItem} ${styles.cardBorderItemTopRight}`} />
      <div className={`${styles.cardBorderItem} ${styles.cardBorderItemBottomLeft}`} />
      <Row className={styles.cardWrapper} align="bottom">
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="vertical" className={styles.cardTextBlock}>
              <Typography.Title level={2}>Твой ринг</Typography.Title>
              <Typography.Text>
                Это <span className={styles.cardTextBlockSpan}>ММА</span> для каждого независимо от возраста и уровня
                подготовки
              </Typography.Text>
            </Space>
            <ButtonCustomed size="large" type="transparent" className={styles.cardButton}>
              Занятие с тренером
            </ButtonCustomed>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
