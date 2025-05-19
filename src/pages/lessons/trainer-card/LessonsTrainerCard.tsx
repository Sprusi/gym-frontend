import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Col, Row, Space, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import styles from './LessonsTrainerCard.module.scss';

export const LessonsTrainerCard = () => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <div className={`${styles.cardBorderItem} ${styles.cardBorderItemTopRight}`} />
      <div className={`${styles.cardBorderItem} ${styles.cardBorderItemBottomLeft}`} />
      <Row className={styles.cardWrapper} align="bottom">
        <Col>
          <Space direction="vertical" size="large">
            <Space direction="vertical" className={styles.cardTextBlock}>
              <Typography.Title level={2}>{InterfaceLabels.LP_TRAINER_CARDS.title}</Typography.Title>
              <Typography.Text>
                {InterfaceLabels.LP_TRAINER_CARDS.subText[0]}
                <span className={styles.cardTextBlockSpan}>{InterfaceLabels.LP_TRAINER_CARDS.subText[1]}</span>
                {InterfaceLabels.LP_TRAINER_CARDS.subText[2]}
              </Typography.Text>
            </Space>
            <ButtonCustomed
              size="large"
              type="transparent"
              className={styles.cardButton}
              onClick={() => navigate('/gym/payment/traner')}
            >
              {InterfaceLabels.LP_TRAINER_CARDS.button}
            </ButtonCustomed>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
