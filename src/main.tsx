import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { EmployeeProvider } from './context/EmployeeContext';
import Home from './pages/Home';

import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeeProvider>
      <Home />
    </EmployeeProvider>
  </StrictMode>
);
