import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Flex, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import styles from '../LessonsTariffCards.module.scss';

import { CARD_TEMPLATE_DATA } from './CardTemplateSettings';

interface CardTemplateProps {
  type: 'girl' | 'child' | 'boy';
}

export const CardTemplate: FC<CardTemplateProps> = ({ type }) => {
  const navigate = useNavigate();
  const { className, title } = CARD_TEMPLATE_DATA[type];

  return (
    <Card className={`${styles.card} ${styles[className]}`}>
      <Flex vertical justify="space-between" className={styles.cardContent}>
        <Typography.Text strong className={styles.cardTitle}>
          {title}
        </Typography.Text>
        <ButtonCustomed className={styles.cardButton} onClick={() => navigate('/gym/payment')}>
          {InterfaceLabels.TP_GO_TRAINING_BUTTON}
        </ButtonCustomed>
      </Flex>
    </Card>
  );
};
