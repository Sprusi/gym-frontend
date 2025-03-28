import React from 'react';

import { Button, Card, Col, Flex, Row, Space, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import styles from './LessonsTariffCards.module.scss';
import { registrationCardsData } from './settings';

export type RegistrationCardType = 'girls' | 'boys' | 'children';

export const LessonsTariffCards = () => {
  const getRegistrationCard = (type: RegistrationCardType) => {
    const { title, imagePath, className } = registrationCardsData[type];
    return (
      <Card className={`${styles.card} ${styles[className]}`} style={{ backgroundImage: `url(${imagePath})` }}>
        <Flex justify="space-between" vertical className={styles.cardWrapper}>
          <Typography.Title className={`${styles[className]}Title`} level={4}>
            {title}
          </Typography.Title>
          <Button className={styles.cardButton} size="large">
            {InterfaceLabels.LP_TARIFF_CARDS_BUTTON}
          </Button>
        </Flex>
      </Card>
    );
  };

  return (
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]} wrap>
      <Col span={12} className={styles.contentColumn}>
        <Space direction="vertical" size="middle" className={styles.contentColumnWrapper}>
          {getRegistrationCard('girls')}
          {getRegistrationCard('children')}
        </Space>
      </Col>
      <Col className={styles.contentColumn} span={12}>
        {getRegistrationCard('boys')}
      </Col>
    </Row>
  );
};
