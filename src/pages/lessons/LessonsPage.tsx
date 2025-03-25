import React from 'react';

import { LessonsInfoCards } from './info-cards/LessonsInfoCards';
import { LessonsTariffCards } from './tariff-cards/LessonsTariffCards';
import { LessonsTrainerCard } from './trainer-card/LessonsTrainerCard';

export const LessonsPage = () => {
  return (
    <div style={{ width: '80%', height: '100vh', overflow: 'hidden', margin: '0 auto' }}>
      <LessonsTrainerCard />
      <LessonsInfoCards />
      <LessonsTariffCards />
    </div>
  );
};
