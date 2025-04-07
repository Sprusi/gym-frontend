import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AnimationPage } from '@/pages/animation/AnimationPage';
import { LessonsPage } from '@/pages/lessons/LessonsPage';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<AnimationPage />} />
      <Route path="/lessons" element={<LessonsPage />} />
      <Route path="*" element={<Navigate replace to={'/'} />} />
    </Routes>
  );
};

export default Navigation;
