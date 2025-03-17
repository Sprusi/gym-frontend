import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './navigation/Navigation';

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};
export default App;
