import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';

import { Achievements } from '@/pages/achievements/Achievements';
import { AnimationPage } from '@/pages/animation/AnimationPage';
import { LessonsPage } from '@/pages/lessons/LessonsPage';
import { PaymentList } from '@/pages/payment/admin-list/PaymentList';
import { Payment } from '@/pages/payment/Payment';
import { TrainingList } from '@/pages/training/TrainingList';

import { getDefaultPath, hasAccess } from '@/utils/SecurityUtils';

import '../index.css';

import { BaseLayout } from '@/layout/BaseLayout';
import { gymTheme } from '@/styles/theme';

const Navigation = () => {
  return (
    <ConfigProvider locale={ru_RU} theme={gymTheme}>
      <Routes>
        <Route path="/" element={<AnimationPage />} index />
        <Route path="*" element={<Navigate replace to={getDefaultPath()} />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/payment/:type?" element={<Payment />} />
        <Route element={<BaseLayout />}>
          {hasAccess('payment-profile') && <Route path="payment-profile" element={<Payment />} />}
          {hasAccess('payment-list') && <Route path="payment-list" element={<PaymentList />} />}
          {hasAccess('achievements') && <Route path="achievements" element={<Achievements />} />}
          {hasAccess('training-list') && <Route path="training-list" element={<TrainingList />} />}
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default Navigation;
