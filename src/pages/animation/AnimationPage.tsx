import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Space, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import styles from './AnimationPage.module.scss';
import { BackgroundMotion } from './background-motion/BackgroundMotion';

export const AnimationPage: FC = () => {
  const navigate = useNavigate();
  const handleStart = () => navigate('lessons');

  return (
    <BackgroundMotion>
      <Flex align="center" className={styles.viewWrapper}>
        <Space className={styles.view} direction="vertical">
          <Space direction="vertical">
            <Typography.Title className={styles.viewTitle}>{InterfaceLabels.AP_TITLE_FIRST}</Typography.Title>
            <Typography.Title className={styles.viewTitle}>{InterfaceLabels.AP_TITLE_SECOND}</Typography.Title>
          </Space>
          <Space>
            <Typography.Text className={styles.viewMotivationBlock}>
              {InterfaceLabels.AP_MOTIVATIONAL_QUOTE}
            </Typography.Text>
          </Space>
          <Space>
            <ButtonCustomed type="transparent" onClick={handleStart}>
              {InterfaceLabels.AP_START_BUTTON}
            </ButtonCustomed>
          </Space>
        </Space>
      </Flex>
    </BackgroundMotion>
  );
};
