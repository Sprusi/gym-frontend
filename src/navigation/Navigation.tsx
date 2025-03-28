import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AnimationPage } from '@/pages/animation/AnimationPage';
import { LessonsPage } from '@/pages/lessons/LessonsPage';

import BaseLayout from '@/layout/BaseLayout';

const Navigation = () => {
  const defaultPath = '/preview';

  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/preview" element={<AnimationPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/" element={<Navigate replace to={defaultPath} />} />
        <Route path="*" element={<Navigate replace to={defaultPath} />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
