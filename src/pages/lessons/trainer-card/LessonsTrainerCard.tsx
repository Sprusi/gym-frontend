import React from 'react';

import { Card, Flex, Space, Typography } from 'antd';

import { ButtonCustomer } from '@/components/button-customer/ButtonCustomer';

import { InterfaceLabels } from '@/constants';

import styles from './LessonsTrainerCard.module.scss';

export const LessonsTrainerCard = () => {
  const subTitle = (
    <Typography.Text>
      {InterfaceLabels.LP_TRAINER_CARD_SUBTITLE[0]}
      <span className={styles.cardSubTitleSpan}>{InterfaceLabels.LP_TRAINER_CARD_SUBTITLE[1]}</span>
      {InterfaceLabels.LP_TRAINER_CARD_SUBTITLE[2]}
    </Typography.Text>
  );

  return (
    <Card className={styles.card}>
      <div className={`${styles.cardBorderItem} ${styles.cardBorderItemBottomLeft}`} />
      <div className={`${styles.cardBorderItem} ${styles.cardBorderItemTopRight}`} />
      <Flex className={styles.cardWrapper} vertical justify="space-between">
        <Space direction="vertical">
          <Typography.Title>{InterfaceLabels.LP_TRAINER_CARD_TITLE}</Typography.Title>
          <Space className={styles.cardSubTitle}>{subTitle}</Space>
        </Space>
        <ButtonCustomer type="light" size="large">
          {InterfaceLabels.LP_TRAINER_CARD_BUTTON}
        </ButtonCustomer>
      </Flex>
    </Card>
  );
};
