import React from 'react';

import { Space } from 'antd';

import { LessonsInfoCards } from './info-cards/LessonsInfoCards';
import styles from './LessonsPage.module.scss';
import { LessonsTariffCards } from './tariff-cards/LessonsTariffCards';
import { LessonsTrainerCard } from './trainer-card/LessonsTrainerCard';

export const LessonsPage = () => {
  return (
    <Space className={styles.view} direction="vertical">
      <LessonsTrainerCard />
      <LessonsInfoCards />
      <LessonsTariffCards />
    </Space>
  );
};
