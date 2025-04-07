import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './navigation';

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};
export default App;
