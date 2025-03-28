import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Space, Typography } from 'antd';

import { ButtonCustomer } from '@/components/button-customer/ButtonCustomer';

import { InterfaceLabels } from '@/constants';

import styles from './AnimationPage.module.scss';
import { BackgroundMotion } from './background-motion/BackgroundMotion';

export const AnimationPage: FC = () => {
  const navigate = useNavigate();
  const handleStart = () => navigate('/lessons');

  return (
    <BackgroundMotion>
      <Flex className={styles.viewWrapper}>
        <Space className={styles.view} direction="vertical">
          <Space direction="vertical">
            <Typography.Title className={styles.viewTitle}>{InterfaceLabels.AP_TITLE_FIRST}</Typography.Title>
            <Typography.Title className={styles.viewTitle}>{InterfaceLabels.AP_TITLE_SECOND}</Typography.Title>
          </Space>
          <Space>
            <Typography.Text>{InterfaceLabels.AP_MOTIVATIONAL_QUOTE}</Typography.Text>
          </Space>
          <Space>
            <ButtonCustomer type="transparent" size="large" onClick={handleStart}>
              {InterfaceLabels.AP_START_BUTTON}
            </ButtonCustomer>
          </Space>
        </Space>
      </Flex>
    </BackgroundMotion>
  );
};
