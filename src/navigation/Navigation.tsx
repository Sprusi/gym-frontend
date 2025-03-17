import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Default } from '@/components/default/Default';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="*" element={<Navigate replace to={'/'} />} />
    </Routes>
  );
};

export default Navigation;
