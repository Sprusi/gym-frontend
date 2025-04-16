import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AnimationPage } from '@/pages/animation/AnimationPage';
import { LessonsPage } from '@/pages/lessons/LessonsPage';

import '../index.css';

import { BaseLayout } from '@/layout/BaseLayout';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<AnimationPage />} />
      <Route element={<BaseLayout />}>
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="*" element={<Navigate replace to={'/'} />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
